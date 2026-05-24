package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.ExperienciaDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.ExperienciaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experiencia")
public class ExperienciaController {

    private final ExperienciaService experienciaService;
    private final static Logger logger = LoggerFactory.getLogger(ExperienciaController.class);

    public ExperienciaController(ExperienciaService experienciaService) {
        this.experienciaService = experienciaService;
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioTokenIdentResponseDto> registerExperiencias(@RequestBody List<ExperienciaDtoRequest> experiencias, @RequestParam String token){

        logger.info("Inicio do cadastro de experiencias");

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = experienciaService.cadastrarExperiencias(experiencias,token);

        logger.info("Experiencias cadastradas com sucesso");

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
