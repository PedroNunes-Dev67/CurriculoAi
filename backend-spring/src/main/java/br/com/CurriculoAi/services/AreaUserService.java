package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.AreaUserDTO;
import br.com.CurriculoAi.repositories.AreaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AreaUserService {

    @Autowired
    AreaUserRepository repository;

}
