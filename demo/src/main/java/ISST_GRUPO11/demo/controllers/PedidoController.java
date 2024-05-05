package ISST_GRUPO11.demo.controllers;

import ISST_GRUPO11.demo.models.Pedido;
import ISST_GRUPO11.demo.security.services.PedidoService;
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
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/upload")
    @PreAuthorize("isAuthenticated()")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> uploadPedido(@RequestParam("file") MultipartFile file,
            @RequestParam("material") String material,
            @RequestParam("colorYAcabado") String colorYAcabado,
            @RequestParam("escala") Integer escala,
            @RequestParam("cantidad") Integer cantidad,
            @RequestParam("aceptadoPor") String aceptadoPor,
            @RequestParam("pedidoPor") String pedidoPor,
            @RequestParam("pagoId") Integer pagoId) {
        try {
            // Obtiene el tipo de archivo del objeto MultipartFile
            String fileType = file.getContentType();
            // Llama al servicio para almacenar el pedido, incluyendo el tipo de archivo
            Pedido pedido = pedidoService.storePedido(file, material, colorYAcabado, escala, cantidad, aceptadoPor,
                    pedidoPor, pagoId, fileType);
            return ResponseEntity.ok("Pedido creado con éxito: " + pedido.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo crear el pedido: " + e.getMessage());
        }
    }

    @GetMapping("/myuploads")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Pedido>> getMyPedidos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<Pedido> pedidos = pedidoService.findPedidosByUsername(username);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoService.getPedidoById(id);
        return pedido.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updatePedido(@PathVariable Integer id, @RequestBody Pedido pedidoDetails) {
        try {
            Pedido updatedPedido = pedidoService.updatePedido(id, pedidoDetails);
            return ResponseEntity.ok(updatedPedido);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error actualizando el pedido: " + e.getMessage());
        }
    }

    @GetMapping("/download/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Integer id) {
        Optional<Pedido> pedidoOpt = pedidoService.getPedidoById(id);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = pedidoOpt.get();
            // Utiliza el tipo de archivo almacenado en el pedido para determinar el
            // Content-Type
            String contentType = pedido.getFileType();
            // Asegúrate de que el nombre del archivo sea adecuado para el tipo de archivo
            String filename = "pedido_" + pedido.getId() + "." + getFileExtension(contentType);
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(new ByteArrayResource(pedido.getArchivo()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/maxPagoId")
    public ResponseEntity<Integer> getMaxPagoId() {
        Integer maxPagoId = pedidoService.getMaxPagoId();
        return ResponseEntity.ok(maxPagoId);
    }

    private String getFileExtension(String contentType) {
        switch (contentType) {
            case "model/stl":
                return "stl";
            case "model/obj":
                return "obj";
            case "application/vnd.ms-pki.stl":
                return "stl";
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "pptx";
            default:
                return "bin"; // Valor predeterminado para tipos de archivo desconocidos
        }
    }

}
