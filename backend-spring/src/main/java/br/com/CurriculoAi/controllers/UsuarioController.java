package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.UsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.LoginDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<UsuarioTokenIdentResponseDto> createUsuario(@RequestBody UsuarioDtoRequest usuarioCad){

        UsuarioTokenIdentResponseDto usuario = service.createUsuario(usuarioCad);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDtoResponse loginDtoResponse){

        String token = service.login(loginDtoResponse);

        return ResponseEntity.ok(token);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable("id") Long id){

        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioFullContentDtoResponse> me(){

        UsuarioFullContentDtoResponse usuario = service.me();

        return ResponseEntity.ok(usuario);
    }
}
