package br.com.CurriculoAi;

import br.com.CurriculoAi.entities.*;
import br.com.CurriculoAi.enums.IdiomaEnum;
import br.com.CurriculoAi.enums.RoleEnum;
import br.com.CurriculoAi.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class InitialzrData implements CommandLineRunner {

    private final AreaUserRepository areaUserRepository;

    private final RoleRepository roleRepository;
    private final InstituicaoRepository instituicaoRepository;
    private final EmpresaRepository empresaRepository;
    private final IdiomaRepository idiomaRepository;

    public InitialzrData(AreaUserRepository areaUserRepository, RoleRepository roleRepository, InstituicaoRepository instituicaoRepository, EmpresaRepository empresaRepository, IdiomaRepository idiomaRepository) {
        this.areaUserRepository = areaUserRepository;
        this.roleRepository = roleRepository;
        this.instituicaoRepository = instituicaoRepository;
        this.empresaRepository = empresaRepository;
        this.idiomaRepository = idiomaRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Area area1 = new Area(null, "ADS");

        Role role1 = new Role(null, RoleEnum.ROLE_CANDIDATO);
        Role role2 = new Role(null, RoleEnum.ROLE_RECRUTADOR);

        areaUserRepository.save(area1);
        roleRepository.saveAll(Arrays.asList(role1,role2));

        Instituicao instituicao1 = new Instituicao(null,"DIO");
        Instituicao instituicao2 = new Instituicao(null,"Alura");

        Empresa empresa1 = new Empresa(null, "Accenture");
        Empresa empresa2 = new Empresa(null, "Sicap");

        instituicaoRepository.saveAll(Arrays.asList(instituicao1,instituicao2));
        empresaRepository.saveAll(Arrays.asList(empresa1,empresa2));

        Idioma idioma1 = new Idioma(null, IdiomaEnum.PORTUGUES);
        Idioma idioma2 = new Idioma(null, IdiomaEnum.INGLES);

        idiomaRepository.saveAll(Arrays.asList(idioma1,idioma2));
    }
}
