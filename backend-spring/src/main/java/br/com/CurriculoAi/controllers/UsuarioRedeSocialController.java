package br.com.CurriculoAi.controllers;

import br.com.CurriculoAi.DTO.request.RedeSocialUsuarioDtoRequest;
import br.com.CurriculoAi.DTO.response.UsuarioRedeSocialDtoResponse;
import br.com.CurriculoAi.services.RedeSocialUsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuairo/rede-social")
@RequiredArgsConstructor
@Tag(name = "Usuario Rede Social Controller", description = "Responsável pelas ações relacioandas as redes sociais do usuário")
public class UsuarioRedeSocialController {

    private final RedeSocialUsuarioService redeSocialUsuarioService;

    @PostMapping("/register")
    public ResponseEntity<List<UsuarioRedeSocialDtoResponse>> registerRedesSociaisUsuarios(@RequestBody List<RedeSocialUsuarioDtoRequest> redesSociais){

        List<UsuarioRedeSocialDtoResponse> redesSociaisSalvas = redeSocialUsuarioService.registerRedeSocialUsuario(redesSociais);

        return ResponseEntity.ok(redesSociaisSalvas);
    }
}
