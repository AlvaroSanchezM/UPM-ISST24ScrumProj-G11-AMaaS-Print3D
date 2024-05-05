package ISST_GRUPO11.demo.repository;

import ISST_GRUPO11.demo.models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByUsername(String username);

    @Query("SELECT MAX(p.pagoId) FROM Pedido p")
    Integer findMaxPagoId();
}
