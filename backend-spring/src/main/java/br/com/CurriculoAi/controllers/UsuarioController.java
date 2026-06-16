package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.UsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.LoginDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Tag(name = "Usuário Controller", description = "Responsável por controlar as ações relacionadas aos usuários")
public class UsuarioController {


    private final UsuarioService service;

    @Operation(summary = "Retorna usuário pelo ID",
        description = "Role necessária = `ADMIN`")
    @GetMapping("/{id}")
    public UsuarioCad findById(@PathVariable("id") Long id) {
        return service.findByid(id);
    }

    @Operation(summary = "Cadastrar um usuário",
            description = "É passado as informações no body da requisição, retornando um `TOKEN` de identificação do usuário, que será usado para as proximas etapas do cadastro!")
    @PostMapping(value = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UsuarioTokenIdentResponseDto> createUsuario(@RequestBody UsuarioDtoRequest usuarioCad){

        UsuarioTokenIdentResponseDto usuario = service.createUsuario(usuarioCad);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @Operation(summary = "Logar usuário",
        description = "Realiza o login do usuário, que retornará um `JWT`, que será usado para autenticação e autorização do usuário durante o uso do APP")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDtoResponse loginDtoResponse){

        String token = service.login(loginDtoResponse);

        return ResponseEntity.ok(token);
    }

    @Operation(summary = "Deletar usuário",
        description = "Deleta um usuário pelo ID, uso exclusivo de ROLES = `ADMIN`")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable("id") Long id){

        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Retornar todas as informações do usuário",
        description = "Retorna todas as informações do usuário, trazendo todos os dados que estão relacionados, OBS: `Autenticaçaõ pelo JWT necessária`")
    @GetMapping("/me")
    public ResponseEntity<UsuarioFullContentDtoResponse> me(){

        UsuarioFullContentDtoResponse usuario = service.me();

        return ResponseEntity.ok(usuario);
    }
}
