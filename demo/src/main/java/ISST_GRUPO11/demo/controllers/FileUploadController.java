package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.FileUpload;
import ISST_GRUPO11.demo.security.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    @PreAuthorize("isAuthenticated()")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("name") String name,
                                             @RequestParam("email") String email,
                                             @RequestParam("address") String address) {
        try {
            FileUpload fileUpload = fileUploadService.storeFile(file, name, email, address);
            return ResponseEntity.ok("Archivo subido con éxito: " + fileUpload.getFileName());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo subir el archivo: " + file.getOriginalFilename() + ".");
        }
    }
}