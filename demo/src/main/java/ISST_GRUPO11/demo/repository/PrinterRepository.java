package ISST_GRUPO11.demo.repository;

import ISST_GRUPO11.demo.models.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrinterRepository extends JpaRepository<Printer, Long> {
    List<Printer> findByUsername(String username);


}
