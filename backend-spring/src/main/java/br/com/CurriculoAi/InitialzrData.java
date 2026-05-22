package br.com.CurriculoAi;

import br.com.CurriculoAi.entities.Area;
import br.com.CurriculoAi.entities.Role;
import br.com.CurriculoAi.enums.RoleEnum;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import br.com.CurriculoAi.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class InitialzrData implements CommandLineRunner {

    private final AreaUserRepository areaUserRepository;

    private final RoleRepository roleRepository;

    public InitialzrData(AreaUserRepository areaUserRepository, RoleRepository roleRepository) {
        this.areaUserRepository = areaUserRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Area area1 = new Area(null, "ADS");

        Role role1 = new Role(null, RoleEnum.ROLE_CANDIDATO);
        Role role2 = new Role(null, RoleEnum.ROLE_RECRUTADOR);

        areaUserRepository.save(area1);
        roleRepository.saveAll(Arrays.asList(role1,role2));
    }
}
