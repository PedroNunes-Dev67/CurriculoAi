package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.DisponibilidadeDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.DisponibilidadeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/disponibilidade")
@Tag(name = "Disponibilidade Controller", description = "Responsável por  controlar as ações relionadas a disponibilidade do usuário")
public class DisponibilidadeController {

    private final DisponibilidadeService disponibilidadeService;
    private final static Logger logger = LoggerFactory.getLogger(DisponibilidadeController.class);

    public DisponibilidadeController(DisponibilidadeService disponibilidadeService) {
        this.disponibilidadeService = disponibilidadeService;
    }

    @Operation(summary = "Resgistrar disponibilidade do usuário",
            description = "É passado uma disponibilidade do usuário no body da requisição, atribuindo a ele, o identificando pelo `TOKEN` passado na URL da requisição")
    @PostMapping("/register")
    public ResponseEntity<UsuarioTokenIdentResponseDto> registerDisponibilidade(@RequestBody DisponibilidadeDtoRequest disponibilidade, @RequestParam String token){

        logger.info("Iniciando o processo de registro de disponibilidade");

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = disponibilidadeService.cadastrarDisponibilidade(disponibilidade,token);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
