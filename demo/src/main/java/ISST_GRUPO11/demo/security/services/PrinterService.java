package ISST_GRUPO11.demo.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ISST_GRUPO11.demo.models.Printer;
import ISST_GRUPO11.demo.repository.PrinterRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PrinterService {

    @Autowired
    private PrinterRepository printerRepository;

    public List<Printer> findPrintersByUsername(String username) {
        return printerRepository.findByUsername(username);
    }

    public Printer addPrinter(Printer printer) {
        return printerRepository.save(printer);
    }

    public void deletePrinter(Long id) {
        printerRepository.deleteById(id);
    }

    public Printer updatePrinter(Printer printer) {
        Printer existingPrinter = printerRepository.findById(printer.getId())
                .orElseThrow(() -> new RuntimeException("Printer not found with id " + printer.getId()));

        // Actualizar todos los campos relevantes
        existingPrinter.setModel(printer.getModel());
        existingPrinter.setSpecifications(printer.getSpecifications());
        existingPrinter.setMaterials(printer.getMaterials());
        existingPrinter.setMaxWidth(printer.getMaxWidth());
        existingPrinter.setMaxLength(printer.getMaxLength());
        existingPrinter.setMaxHeight(printer.getMaxHeight());
        existingPrinter.setSpeed(printer.getSpeed());
        existingPrinter.setMaterialCost(printer.getMaterialCost());
        existingPrinter.setOperationCost(printer.getOperationCost());
        existingPrinter.setLatitude(printer.getLatitude());
        existingPrinter.setLongitude(printer.getLongitude());
        existingPrinter.setVerification(printer.getVerification());
        existingPrinter.setImageUrl(printer.getImageUrl()); // Asegúrate de actualizar la URL de la imagen si es
                                                            // necesario

        return printerRepository.save(existingPrinter);
    }

    public Optional<Printer> findPrinterById(Long id) {
        return printerRepository.findById(id);
    }

    public List<Printer> findAllPrinters() {
        return printerRepository.findAll();
    }
}
