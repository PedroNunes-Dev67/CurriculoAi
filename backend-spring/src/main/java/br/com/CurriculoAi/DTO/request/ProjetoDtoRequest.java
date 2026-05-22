package br.com.CurriculoAi.DTO.request;

import java.util.List;

public record ProjetoDtoRequest (

    String titulo,
    String descriacao,
    String link,
    List<HabilidadeDtoRequest> habilidades
){

}
