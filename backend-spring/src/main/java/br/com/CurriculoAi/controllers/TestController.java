package br.com.CurriculoAi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class TestController {

    @GetMapping("/teste-candidato")
    public String testeCandidato(){
        return "Este é um endpoint exclusivo de candidato";
    }
}
