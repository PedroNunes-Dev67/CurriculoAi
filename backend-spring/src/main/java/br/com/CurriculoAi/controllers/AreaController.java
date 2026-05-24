package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.AreaUserAddDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.AreaUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/area")
@Tag(name = "Area Controller", description = "Responsável por controlar as ações relacionadas as Áreas")
public class AreaController {

    private final AreaUserService areaUserService;

    public AreaController(AreaUserService areaUserService) {
        this.areaUserService = areaUserService;
    }

    @PostMapping("/add")
    public ResponseEntity<UsuarioTokenIdentResponseDto> addAreaUser(@RequestBody AreaUserAddDtoRequest areaUserAddDtoRequest){

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = areaUserService.addAreaUser(areaUserAddDtoRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }
}
