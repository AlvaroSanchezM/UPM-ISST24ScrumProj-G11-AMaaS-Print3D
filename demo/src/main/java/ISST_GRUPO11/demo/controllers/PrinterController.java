package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.Printer;
import ISST_GRUPO11.demo.security.services.GeocodingService;
import ISST_GRUPO11.demo.security.services.PrinterService;
import io.jsonwebtoken.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ISST_GRUPO11.demo.models.Coordinates;

import com.fasterxml.jackson.databind.ObjectMapper; // Importa ObjectMapper para deserialización JSON

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/printers")
public class PrinterController {

    @Autowired
    private PrinterService printerService;

    @GetMapping
    public ResponseEntity<List<Printer>> getMyPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<Printer> printers = printerService.findPrintersByUsername(username);
        return ResponseEntity.ok(printers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Printer> getPrinterById(@PathVariable Long id) {
        Optional<Printer> printer = printerService.findPrinterById(id);
        return printer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPrinter(@RequestParam("image") MultipartFile image,
            @RequestParam("printer") String printerStr,
            @RequestParam("address") String address) throws java.io.IOException {
        try {
            // Deserializa la cadena JSON a un objeto Printer
            Printer printer = new ObjectMapper().readValue(printerStr, Printer.class);

            // Obtiene las coordenadas geográficas de la dirección
            Coordinates coordinates = GeocodingService.getCoordinatesFromAddress(address);
            if (coordinates != null) {
                printer.setLatitude(coordinates.getLatitude());
                printer.setLongitude(coordinates.getLongitude());
            }

            // Asigna la imagen convertida a bytes
            printer.setImage(image.getBytes());

            // Guarda el objeto Printer
            Printer savedPrinter = printerService.addPrinter(printer);
            return ResponseEntity.ok(savedPrinter);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error processing image: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrinter(@PathVariable Long id) {
        try {
            printerService.deletePrinter(id);
            return ResponseEntity.ok().body("Printer deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting printer: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable Long id, @RequestBody Printer printerDetails) {
        Printer updatedPrinter = printerService.updatePrinter(id, printerDetails);
        if (updatedPrinter == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPrinter);
    }

    private static final int EARTH_RADIUS = 6371; // Radius of the earth in km

    private static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = EARTH_RADIUS * c;
        return distance;
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<Printer>> getNearbyPrinters(@RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude) {
        List<Printer> printers = printerService.findAllPrinters();
        printers.sort((p1, p2) -> {
            double distance1 = calculateDistance(latitude, longitude, p1.getLatitude(), p1.getLongitude());
            double distance2 = calculateDistance(latitude, longitude, p2.getLatitude(), p2.getLongitude());
            return Double.compare(distance1, distance2);
        });
        return ResponseEntity.ok(printers);
    }
}
