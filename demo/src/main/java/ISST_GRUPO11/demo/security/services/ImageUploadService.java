package ISST_GRUPO11.demo.security.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public ImageUploadService() {
        Map config = ObjectUtils.asMap(
                "cloud_name", "dajhrhlba",
                "api_key", "118397476628966",
                "api_secret", "RBp1_4wayaK7hPx4hCuWygTibKs");
        this.cloudinary = new Cloudinary(config);
    }

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString();
    }
}
