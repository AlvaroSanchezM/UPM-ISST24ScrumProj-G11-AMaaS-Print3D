package ISST_GRUPO11.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "printers")
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_id")
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @NotBlank
    @Size(max = 50)
    @Column(name = "propietary")
    private String propietary;

    @NotBlank
    @Size(max = 50)
    @Column(name = "model")
    private String model;

    @NotBlank
    @Size(max = 255)
    @Column(name = "specifications")
    private String specifications;

    @NotBlank
    @Size(max = 255)
    @Column(name = "materials")
    private String materials;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @NotBlank
    @Size(max = 50)
    @Column(name = "username")
    private String username; // Owner's username

    @Column(name = "max_width")
    private Integer maxWidth;

    @Column(name = "max_length")
    private Integer maxLength;

    @Column(name = "max_height")
    private Integer maxHeight;

    @Column(name = "speed")
    private Double speed;

    @Column(name = "material_cost")
    private Double materialCost;

    @Column(name = "operation_cost")
    private Double operationCost;

    @Column(name = "verification")
    private Boolean verification;

    // Constructors
    public Printer() {
    }

    // Constructor completo
    public Printer(String propietary, String model, String specifications, String materials, String username,
            Integer maxWidth, Integer maxLength, Integer maxHeight, Double speed, Double materialCost, String imageUrl,
            Double operationCost, Boolean verification, Double latitude, Double longitude) {
        this.propietary = propietary;
        this.model = model;
        this.specifications = specifications;
        this.materials = materials;
        this.username = username;
        this.maxWidth = maxWidth;
        this.maxLength = maxLength;
        this.maxHeight = maxHeight;
        this.speed = speed;
        this.imageUrl = imageUrl;
        this.materialCost = materialCost;
        this.operationCost = operationCost;
        this.verification = verification;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPropietary() {
        return propietary;
    }

    public void setPropietary(String propietary) {
        this.propietary = propietary;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getMaterials() {
        return materials;
    }

    public void setMaterials(String materials) {
        this.materials = materials;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getMaxWidth() {
        return maxWidth;
    }

    public void setMaxWidth(Integer maxWidth) {
        this.maxWidth = maxWidth;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    public Integer getMaxHeight() {
        return maxHeight;
    }

    public void setMaxHeight(Integer maxHeight) {
        this.maxHeight = maxHeight;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Double getMaterialCost() {
        return materialCost;
    }

    public void setMaterialCost(Double materialCost) {
        this.materialCost = materialCost;
    }

    public Double getOperationCost() {
        return operationCost;
    }

    public void setOperationCost(Double operationCost) {
        this.operationCost = operationCost;
    }

    public Boolean getVerification() {
        return verification;
    }

    public void setVerification(Boolean verification) {
        this.verification = verification;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

}