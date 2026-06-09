package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.response.CursoDtoResponse;
import br.com.CurriculoAi.services.CursoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/curso")
@Tag(name = "Curso Controller", description = "Responsável pelas ações relacioandas aos cursos do sistema")
@RequiredArgsConstructor
public class CursoController {

    private final CursoService cursoService;

    @GetMapping
    @Operation(summary = "Buscar cursos", description = "Busca todos os cursos cadastrados no sistema em ordem alfabética. `AUTENTICAÇÃO NECESSÁRIA`")
    public ResponseEntity<List<CursoDtoResponse>> findAll(){

        List<CursoDtoResponse> cursos = cursoService.findAll();

        return ResponseEntity.ok(cursos);
    }
}
