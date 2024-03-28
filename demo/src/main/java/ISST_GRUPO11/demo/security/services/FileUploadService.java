package ISST_GRUPO11.demo.security.services;

import ISST_GRUPO11.demo.models.FileUpload;
import ISST_GRUPO11.demo.repository.FileUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileUploadService {

    @Autowired
    private FileUploadRepository fileUploadRepository;

    public FileUpload storeFile(MultipartFile file, String name, String email, String address) throws IOException {
        FileUpload fileUpload = new FileUpload();
        fileUpload.setName(name);
        fileUpload.setEmail(email);
        fileUpload.setAddress(address);
        fileUpload.setFileName(file.getOriginalFilename());
        fileUpload.setFileType(file.getContentType());
        fileUpload.setFileData(file.getBytes());

        return fileUploadRepository.save(fileUpload);
    }
}
