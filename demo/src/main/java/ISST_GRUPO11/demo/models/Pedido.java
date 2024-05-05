package ISST_GRUPO11.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] archivo;

    private String username; // Campo existente

    @NotBlank
    @Size(max = 50)
    private String material;

    @NotBlank
    @Size(max = 50)
    private String colorYAcabado;

    private Integer escala;

    private Integer cantidad;

    @Size(max = 50)
    private String aceptadoPor;

    @NotBlank
    @Size(max = 50)
    private String pedidoPor;

    private Integer pagoId;

    // Nuevo campo para almacenar el tipo de archivo
    private String fileType;

    // Constructores
    public Pedido() {
    }

    public Pedido(byte[] archivo, String material, String colorYAcabado, Integer escala, Integer cantidad,
            String aceptadoPor, String pedidoPor, Integer pagoId, String fileType) {
        this.archivo = archivo;
        this.material = material;
        this.colorYAcabado = colorYAcabado;
        this.escala = escala;
        this.cantidad = cantidad;
        this.aceptadoPor = aceptadoPor;
        this.pedidoPor = pedidoPor;
        this.pagoId = pagoId;
        this.fileType = fileType; // Inicializa el nuevo campo
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getArchivo() {
        return archivo;
    }

    public void setArchivo(byte[] archivo) {
        this.archivo = archivo;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getColorYAcabado() {
        return colorYAcabado;
    }

    public void setColorYAcabado(String colorYAcabado) {
        this.colorYAcabado = colorYAcabado;
    }

    public Integer getEscala() {
        return escala;
    }

    public void setEscala(Integer escala) {
        this.escala = escala;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getAceptadoPor() {
        return aceptadoPor;
    }

    public void setAceptadoPor(String aceptadoPor) {
        this.aceptadoPor = aceptadoPor;
    }

    public String getPedidoPor() {
        return pedidoPor;
    }

    public void setPedidoPor(String pedidoPor) {
        this.pedidoPor = pedidoPor;
    }

    public Integer getPagoId() {
        return pagoId;
    }

    public void setPagoId(Integer pagoId) {
        this.pagoId = pagoId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter y Setter para el nuevo campo fileType
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    // Métodos setPrinter no implementados

    public void setPrinter(Integer printerId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPrinter'");
    }

    public void setPrinter(String printerId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPrinter'");
    }

}