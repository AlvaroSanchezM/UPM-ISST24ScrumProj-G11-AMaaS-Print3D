package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.FileUpload;
import ISST_GRUPO11.demo.security.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/myuploads")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FileUpload>> getMyFileUploads() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<FileUpload> uploads = fileUploadService.findFilesByUsername(username);
        return ResponseEntity.ok(uploads);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FileUpload> getFileUploadById(@PathVariable Long id) {
        Optional<FileUpload> fileUpload = fileUploadService.getFileById(id);
        return fileUpload.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/assignPrinter")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> assignPrinterToFileUpload(@PathVariable Long id, @RequestParam("printerId") Integer printerId) {
        try {
            FileUpload updatedFileUpload = fileUploadService.assignPrinterToFileUpload(Math.toIntExact(id), printerId);
            return ResponseEntity.ok(updatedFileUpload);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error assigning printer to file upload: " + e.getMessage());
        }
    }

    @GetMapping("/download/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long id) {
        Optional<FileUpload> fileUploadOpt = fileUploadService.getFileById(id);
        if (fileUploadOpt.isPresent()) {
            FileUpload fileUpload = fileUploadOpt.get();
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(fileUpload.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileUpload.getFileName() + "\"")
                    .body(new ByteArrayResource(fileUpload.getFileData()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
