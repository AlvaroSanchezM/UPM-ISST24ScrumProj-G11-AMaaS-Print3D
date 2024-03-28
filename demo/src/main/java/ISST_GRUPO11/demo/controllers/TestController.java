package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.FileUpload;
import ISST_GRUPO11.demo.security.services.FileUploadService;
import ISST_GRUPO11.demo.security.services.UserDetailsImpl;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/all")
    public Map<String, Object> allAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", userDetails.getUsername());
        userInfo.put("email", userDetails.getEmail());
        // Add other user details as needed
        // userInfo.put("homeDirectory", userDetails.getHomeDirectory());

        return userInfo;
    }

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("name") String name,
                                        @RequestParam("email") String email,
                                        @RequestParam("address") String address) {
        try {
            FileUpload fileUpload = fileUploadService.storeFile(file, name, email, address);
            return ResponseEntity.ok("File uploaded successfully: " + fileUpload.getFileName());
        } catch (IOException | java.io.IOException e) {
            return ResponseEntity.badRequest().body("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }
}