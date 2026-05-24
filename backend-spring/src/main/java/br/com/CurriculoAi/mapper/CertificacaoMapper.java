package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.response.CertificacaoUserDtoResponse;
import br.com.CurriculoAi.entities.CertificacaoUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {InstituicaoMapper.class})
public interface CertificacaoMapper {

    CertificacaoUserDtoResponse toDto(CertificacaoUser certificacaoUser);
}
