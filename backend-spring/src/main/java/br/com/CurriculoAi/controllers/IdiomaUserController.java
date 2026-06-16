package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.IdiomaUserDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.services.IdiomaUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/idiomas/user")
@Tag(name = "Idiomas User Controller", description = "Responsável por controlar as ações relacionadas aos idiomas do usuário")
public class IdiomaUserController {

    private final IdiomaUserService idiomaUserService;

    public IdiomaUserController(IdiomaUserService idiomaUserService) {
        this.idiomaUserService = idiomaUserService;
    }

    @Operation(summary = "Resgistrar as idiomas do usuário",
            description = "É passado um `Array (lista) de idiomas` no body da requisição, atribuindo ao usuário pelo seu `TOKEN` passado na URL")
    @PostMapping("/register")
    public ResponseEntity<UsuarioFullContentDtoResponse> registerIdiomas(@RequestBody List<IdiomaUserDtoRequest> idiomas, @RequestParam String token){

        UsuarioFullContentDtoResponse usuarioFull = idiomaUserService.registerIdiomasUser(idiomas,token);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioFull);
    }
}
