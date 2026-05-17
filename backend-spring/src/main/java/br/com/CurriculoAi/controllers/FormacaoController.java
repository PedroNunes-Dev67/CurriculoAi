package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.FormacaoDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.FormacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formacao")
public class FormacaoController {

    private final FormacaoService formacaoService;

    public FormacaoController(FormacaoService formacaoService) {
        this.formacaoService = formacaoService;
    }

    @PostMapping("/add")
    public ResponseEntity<UsuarioTokenIdentResponseDto> addFormacao(@RequestBody List<FormacaoDtoRequest> formacaoDtoRequest, @RequestParam String token){

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = formacaoService.addFormacaoUser(formacaoDtoRequest, token);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
