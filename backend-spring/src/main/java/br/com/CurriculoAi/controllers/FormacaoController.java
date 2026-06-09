package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.FormacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.FormacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formacao")
@Tag(name = "Formação Controller", description = "Responsável por controlar as ações relacionadas as formações do usuário")
public class FormacaoController {

    private final FormacaoService formacaoService;

    public FormacaoController(FormacaoService formacaoService) {
        this.formacaoService = formacaoService;
    }

    @Operation(summary = "Resgistrar as formações do usuário",
            description = "É passado um `Array (lista) de formações` no body da requisição, atribuindo ao usuário pelo seu `TOKEN` passado na URL")
    @PostMapping("/add")
    public ResponseEntity<UsuarioTokenIdentResponseDto> addFormacao(@RequestBody List<FormacaoDtoRequest> formacaoDtoRequest, @RequestParam String token){

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = formacaoService.addFormacaoUser(formacaoDtoRequest, token);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
