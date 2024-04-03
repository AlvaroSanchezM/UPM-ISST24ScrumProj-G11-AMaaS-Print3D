package ISST_GRUPO11.demo.security.services;

import ISST_GRUPO11.demo.models.Printer;
import ISST_GRUPO11.demo.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public Printer updatePrinter(Long id, Printer printerDetails) {
        Printer printer = printerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Printer not found with id " + id));
        printer.setModel(printerDetails.getModel());
        printer.setSpecifications(printerDetails.getSpecifications());
        printer.setMaterials(printerDetails.getMaterials());
        // Update other fields as necessary
        return printerRepository.save(printer);
    }

    public Optional<Printer> findPrinterById(Long id) {
        return printerRepository.findById(id);
    }

}
