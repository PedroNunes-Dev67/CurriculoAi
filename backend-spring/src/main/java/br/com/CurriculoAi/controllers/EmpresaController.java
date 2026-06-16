package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.response.EmpresaDtoResponse;
import br.com.CurriculoAi.services.EmpresaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/empresa")
@Tag(name="Empresa Controller", description = "Responsável pelas ações relacionadas as Empresas do sistema")
@RequiredArgsConstructor
public class EmpresaController {

    private final EmpresaService empresaService;

    @Operation(summary = "Buscar empresas", description = "Busca todas as empresas cadastras no sistema em ordem alfabética. `AUTENTICAÇÃO NECESSÁRIA`")
    @GetMapping
    public ResponseEntity<List<EmpresaDtoResponse>> findAll(){

        List<EmpresaDtoResponse> empresas = empresaService.findAll();

        return ResponseEntity.ok(empresas);
    }
}
