package ISST_GRUPO11.demo.repository;

import ISST_GRUPO11.demo.models.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileUploadRepository extends JpaRepository<FileUpload, Integer> {
    List<FileUpload> findByUsername(String username);
}
