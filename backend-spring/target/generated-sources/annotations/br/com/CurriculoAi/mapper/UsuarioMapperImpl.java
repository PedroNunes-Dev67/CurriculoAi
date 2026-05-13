package br.com.CurriculoAi.mapper;

import br.com.CurriculoAi.DTO.UsuarioCadDTO;
import br.com.CurriculoAi.entities.UsuarioCad;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-12T22:48:55-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Ubuntu)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioCadDTO toDto(UsuarioCad usuarioCad) {
        if ( usuarioCad == null ) {
            return null;
        }

        Long id = null;
        String nome = null;
        String senha = null;
        String email = null;
        Long areaId = null;

        UsuarioCadDTO usuarioCadDTO = new UsuarioCadDTO( id, nome, senha, email, areaId );

        return usuarioCadDTO;
    }
}
