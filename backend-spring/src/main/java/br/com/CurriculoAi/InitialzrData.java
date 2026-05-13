package br.com.CurriculoAi;

import br.com.CurriculoAi.entities.AreaUser;
import br.com.CurriculoAi.entities.Role;
import br.com.CurriculoAi.enums.IdiomaEnum;
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

        AreaUser area1 = new AreaUser(null, "ADS");

        Role role1 = new Role(null, RoleEnum.ROLE_CANDIDATO);
        Role role2 = new Role(null, RoleEnum.ROLE_RECRUTADOR);

        areaUserRepository.save(area1);
        roleRepository.saveAll(Arrays.asList(role1,role2));
    }
}
