package ISST_GRUPO11.demo.repository;

import ISST_GRUPO11.demo.models.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileUploadRepository extends JpaRepository<FileUpload, String> {
    // Custom query methods can be added here if needed
}