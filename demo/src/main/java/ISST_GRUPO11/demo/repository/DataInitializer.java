package ISST_GRUPO11.demo.repository;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ISST_GRUPO11.demo.models.ERole;
import ISST_GRUPO11.demo.models.Role;
import ISST_GRUPO11.demo.repository.RoleRepository;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Inserta los roles solo si la tabla está vacía
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
            // Agrega más roles si es necesario
        }
    }
}