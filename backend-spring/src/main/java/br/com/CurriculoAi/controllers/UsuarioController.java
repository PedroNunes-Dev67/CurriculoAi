package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService service;

    @GetMapping("/{id}")
    public UsuarioCad findById(@PathVariable("id") Long id) {
        return service.findByid(id);
    }

    @PostMapping(value = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UsuarioCadDTO createUsuario(@RequestBody UsuarioCadDTO usuarioCad){
        return service.createUsuario(usuarioCad);
    }
}
