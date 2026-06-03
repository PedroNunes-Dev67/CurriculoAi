package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.response.InstituicaoDtoResponse;
import br.com.CurriculoAi.services.InstituicaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/instituicao")
@Tag(name = "Instituição Controller", description = "Responsável pelas ações relacionadas as instituições do sistema")
@RequiredArgsConstructor
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    @Operation(summary = "Buscar Instituições", description = "Busca as instituições cadastradas no sistema. `AUTENTICAÇÃO NECESSÁRIA`")
    @GetMapping
    public ResponseEntity<List<InstituicaoDtoResponse>> findAll(){

        List<InstituicaoDtoResponse> instituicoes = instituicaoService.findAll();

        return ResponseEntity.ok(instituicoes);
    }
}
