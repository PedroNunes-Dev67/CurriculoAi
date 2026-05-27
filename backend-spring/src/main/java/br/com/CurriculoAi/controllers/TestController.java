package br.com.CurriculoAi.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
@Tag(name="Teste Controller", description = "Responsável pelos testes de autorizações do Spring Security")
public class TestController {

    @GetMapping("/teste-candidato")
    public String testeCandidato(){
        return "Este é um endpoint exclusivo de candidato";
    }
}
