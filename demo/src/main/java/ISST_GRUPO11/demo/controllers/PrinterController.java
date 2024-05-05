package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.Printer;
import ISST_GRUPO11.demo.security.services.GeocodingService;
import ISST_GRUPO11.demo.security.services.PrinterService;
import io.jsonwebtoken.io.IOException;
import java.util.Map; // Asegúrate de que esta línea está presente

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ISST_GRUPO11.demo.models.Coordinates;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
// Importa ObjectMapper para deserialización JSON

import java.util.List;
import java.util.Optional;
import java.util.Base64;

@RestController
@RequestMapping("/api/printers")
public class PrinterController {

    @Autowired
    private PrinterService printerService;

    private Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dajhrhlba",
            "api_key", "118397476628966",
            "api_secret", "RBp1_4wayaK7hPx4hCuWygTibKs"));

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
            Printer printer = new ObjectMapper().readValue(printerStr, Printer.class);
            Coordinates coordinates = GeocodingService.getCoordinatesFromAddress(address);
            if (coordinates != null) {
                printer.setLatitude(coordinates.getLatitude());
                printer.setLongitude(coordinates.getLongitude());
            }

            // Subir imagen a Cloudinary y obtener URL
            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) uploadResult.get("url");
            printer.setImageUrl(imageUrl);

            Printer savedPrinter = printerService.addPrinter(printer);
            return ResponseEntity.ok(savedPrinter);
        } catch (Exception e) {
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
    public ResponseEntity<?> updatePrinter(@PathVariable Long id,
            @RequestParam("printer") String printerStr,
            @RequestParam(required = false) MultipartFile image) {
        try {
            Printer existingPrinter = printerService.findPrinterById(id)
                    .orElseThrow(() -> new RuntimeException("Printer not found with id: " + id));

            // Deserializar los datos del printer
            Printer printerDetails = new ObjectMapper().readValue(printerStr, Printer.class);

            // Actualizar los campos del printer
            existingPrinter.setModel(printerDetails.getModel());
            existingPrinter.setSpecifications(printerDetails.getSpecifications());
            existingPrinter.setMaterials(printerDetails.getMaterials());
            existingPrinter.setMaxWidth(printerDetails.getMaxWidth());
            existingPrinter.setMaxLength(printerDetails.getMaxLength());
            existingPrinter.setMaxHeight(printerDetails.getMaxHeight());
            existingPrinter.setSpeed(printerDetails.getSpeed());
            existingPrinter.setMaterialCost(printerDetails.getMaterialCost());
            existingPrinter.setOperationCost(printerDetails.getOperationCost());
            existingPrinter.setLatitude(printerDetails.getLatitude());
            existingPrinter.setLongitude(printerDetails.getLongitude());
            existingPrinter.setVerification(printerDetails.getVerification());

            // Manejar la carga de la nueva imagen si se proporciona
            if (image != null && !image.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = (String) uploadResult.get("url");
                existingPrinter.setImageUrl(imageUrl);
            }

            // Guardar los cambios en la base de datos
            printerService.updatePrinter(existingPrinter);
            return ResponseEntity.ok(existingPrinter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating printer: " + e.getMessage());
        }
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

    @GetMapping("/{id}/image-url")
    public ResponseEntity<String> getPrinterImageUrl(@PathVariable Long id) {
        Optional<Printer> printer = printerService.findPrinterById(id);
        if (printer.isPresent()) {
            String imageUrl = printer.get().getImageUrl();
            return ResponseEntity.ok(imageUrl);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}