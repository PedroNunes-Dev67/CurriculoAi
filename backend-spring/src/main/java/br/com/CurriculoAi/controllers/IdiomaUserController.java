package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.IdiomaUserDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.services.IdiomaUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idiomas/user")
public class IdiomaUserController {

    private final IdiomaUserService idiomaUserService;

    public IdiomaUserController(IdiomaUserService idiomaUserService) {
        this.idiomaUserService = idiomaUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioFullContentDtoResponse> registerIdiomas(@RequestBody List<IdiomaUserDtoRequest> idiomas, @RequestParam String token){

        UsuarioFullContentDtoResponse usuarioFull = idiomaUserService.registerIdiomasUser(idiomas,token);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioFull);
    }
}
