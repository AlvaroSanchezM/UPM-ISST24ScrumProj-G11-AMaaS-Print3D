package ISST_GRUPO11.demo.security.services;

import ISST_GRUPO11.demo.models.Pedido;
import ISST_GRUPO11.demo.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido storePedido(MultipartFile file, String material, String colorYAcabado, Integer escala,
            Integer cantidad, String aceptadoPor, String pedidoPor, Integer pagoId, String fileType)
            throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Pedido pedido = new Pedido();
        pedido.setMaterial(material);
        pedido.setColorYAcabado(colorYAcabado);
        pedido.setEscala(escala);
        pedido.setCantidad(cantidad);
        pedido.setAceptadoPor(aceptadoPor);
        pedido.setPedidoPor(pedidoPor);
        pedido.setPagoId(pagoId);
        pedido.setArchivo(file.getBytes());
        pedido.setFileType(fileType);
        pedido.setUsername(username);
        pedido.setTerminado(false); // Inicializa el campo 'terminado' en false

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> findPedidosByUsername(String username) {
        // Get the username of the logged-in user
        return pedidoRepository.findByUsername(username);
    }

    // Para dar servicio cuando quieres ver las ordenes recibidas
    public List<Pedido> findPedidosByAceptadoPor(String aceptadoPor) {
        // Get the username of the logged-in user
        return pedidoRepository.findByAceptadoPor(aceptadoPor);
    }

    public Optional<Pedido> getPedidoById(Integer id) {
        return pedidoRepository.findById(id);
    }

    // Future method to update a pedido
    public Pedido updatePedido(Integer pedidoId, Pedido pedidoDetails) {
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(pedidoId);
        if (pedidoOpt.isPresent()) {
            Pedido pedido = pedidoOpt.get();
            // Update the fields of the pedido with the details from pedidoDetails
            // For example:
            // pedido.setMaterial(pedidoDetails.getMaterial());
            // Add more fields as necessary
            return pedidoRepository.save(pedido);
        } else {
            throw new RuntimeException("Pedido not found with id: " + pedidoId);
        }
    }

    public Pedido completePedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + id));

        pedido.setTerminado(true);
        return pedidoRepository.save(pedido);
    }

    public Integer getMaxPagoId() {
        return pedidoRepository.findMaxPagoId();
    }

    public void assignOrderToPrinter(Integer id, Integer printerId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'assignOrderToPrinter'");
    }
}
