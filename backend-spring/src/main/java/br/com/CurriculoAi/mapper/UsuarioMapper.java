package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.UsuarioCadDtoResponse;
import br.com.CurriculoAi.DTO.response.UsuarioFullContentDtoResponse;
import br.com.CurriculoAi.entities.UsuarioCad;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {
        FormacaoMapper.class,
        ExperienciaMapper.class,
        CertificacaoMapper.class,
        DisponibilidadeMapper.class,
        IdiomaUserMapper.class,
        AreaUserMapper.class,
        ProjetoMapper.class
})
public interface UsuarioMapper{

    @Mapping(target = "id", source = "id")
    @Mapping(target = "nome", source = "nome")
    @Mapping(target = "email", source = "email")
    UsuarioCadDtoResponse toDto(UsuarioCad usuarioCad);

    @Mapping(target = "usuario", source = "usuarioCad")
    @Mapping(target = "area", source = "area")
    @Mapping(target = "formacoes", source = "formacoes")
    @Mapping(target = "experiencias", source = "experiencias")
    @Mapping(target = "certificoes", source = "certificacoes")
    @Mapping(target = "disponibilidade", source = "disponibilidade")
    @Mapping(target = "idiomas", source = "idiomas")
    @Mapping(target = "projetos", source = "projetos")
    UsuarioFullContentDtoResponse toFullContentDto(UsuarioCad usuarioCad);
}