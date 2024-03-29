package ISST_GRUPO11.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "printers")
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String model;

    @NotBlank
    @Size(max = 255)
    private String specifications;

    @NotBlank
    @Size(max = 255)
    private String materials;

    @NotBlank
    @Size(max = 255)
    private String username; // Owner's username

    // Constructors
    public Printer() {
    }

    public Printer(String model, String specifications, String materials, String username) {
        this.model = model;
        this.specifications = specifications;
        this.materials = materials;
        this.username = username;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getSpecifications() {
        return specifications;
    }

    public String getMaterials() {
        return materials;
    }

    public String getUsername() {
        return username;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public void setMaterials(String materials) {
        this.materials = materials;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
