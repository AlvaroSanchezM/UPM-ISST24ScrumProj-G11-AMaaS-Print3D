package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.Printer;
import ISST_GRUPO11.demo.security.services.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Printer> addPrinter(@RequestBody Printer printer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        printer.setUsername(username); // Set the current user as the owner
        Printer savedPrinter = printerService.addPrinter(printer);
        return ResponseEntity.ok(savedPrinter);
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
}
