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
import java.util.Optional;

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
        // Initially, the printer field is not set as no printer is assigned yet
        // fileUpload.setPrinter(null); // This line is implicit and can be omitted

        return fileUploadRepository.save(fileUpload);
    }

    public List<FileUpload> findFilesByUsername(String username) {
        // Get the username of the logged-in user
        return fileUploadRepository.findByUsername(username);
    }

    public Optional<FileUpload> getFileById(Long id) {
        return fileUploadRepository.findById(Math.toIntExact(id));
    }

    // Future method to assign a printer to a file upload
    public FileUpload assignPrinterToFileUpload(Integer fileId, Integer printerId) {
        Optional<FileUpload> fileUploadOpt = fileUploadRepository.findById(fileId);
        if (fileUploadOpt.isPresent()) {
            FileUpload fileUpload = fileUploadOpt.get();
            fileUpload.setPrinter(printerId); // Assign the printer
            return fileUploadRepository.save(fileUpload);
        } else {
            throw new RuntimeException("File upload not found with id: " + fileId);
        }
    }
}
