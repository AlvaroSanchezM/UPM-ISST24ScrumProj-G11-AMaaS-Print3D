package ISST_GRUPO11.demo.security.services;

import ISST_GRUPO11.demo.models.FileUpload;
import ISST_GRUPO11.demo.repository.FileUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileUploadService {

    @Autowired
    private FileUploadRepository fileUploadRepository;

    public FileUpload storeFile(MultipartFile file, String name, String email, String address) throws IOException {
        // Get the username of the logged-in user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        FileUpload fileUpload = new FileUpload();
        fileUpload.setName(name);
        fileUpload.setEmail(email);
        fileUpload.setAddress(address);
        fileUpload.setFileName(file.getOriginalFilename());
        fileUpload.setFileType(file.getContentType());
        fileUpload.setFileData(file.getBytes());
        fileUpload.setUsername(username); // Set the username

        return fileUploadRepository.save(fileUpload);
    }

    public List<FileUpload> findFilesByUsername(String username) {
         // Get the username of the logged-in user
        return fileUploadRepository.findByUsername(username);
    }
}
