package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.AreaUserAddDtoRequest;
import br.com.CurriculoAi.DTO.response.AreaDTOResponse;
import br.com.CurriculoAi.DTO.response.UsuarioTokenIdentResponseDto;
import br.com.CurriculoAi.services.AreaUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/area")
@Tag(name = "Area Controller", description = "Responsável por controlar as ações relacionadas as Áreas")
public class AreaUserController {

    private final AreaUserService areaUserService;

    public AreaUserController(AreaUserService areaUserService) {
        this.areaUserService = areaUserService;
    }

    @Operation(summary = "Adicioanr Área a um usuário",
            description = "É adicionado uma área a um usuário passando seu `Token de identificação` no body junto com o `ID` da área que será adicionado a esse usuário")
    @PostMapping("/add")
    public ResponseEntity<UsuarioTokenIdentResponseDto> addAreaUser(@RequestBody AreaUserAddDtoRequest areaUserAddDtoRequest){

        UsuarioTokenIdentResponseDto usuarioTokenIdentResponseDto = areaUserService.addAreaUser(areaUserAddDtoRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioTokenIdentResponseDto);
    }

    @Operation(summary = "Atualizar Área do usuário",
            description = "É passado um `ID` de uma Área, onde será atualizado no usuário! `OBS: A Área não pode ser a mesma que o usuário já está!`")
    @PutMapping("/user/update/{id}")
    public ResponseEntity<AreaDTOResponse> updateAreaUser(@PathVariable Long id){

        AreaDTOResponse areaUserAtualizada = areaUserService.updateAreaUser(id);

        return ResponseEntity.ok(areaUserAtualizada);
    }
}
