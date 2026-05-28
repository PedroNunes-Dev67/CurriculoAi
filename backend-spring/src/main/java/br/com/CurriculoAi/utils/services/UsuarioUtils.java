package br.com.CurriculoAi.utils.services;

import br.com.CurriculoAi.entities.UsuarioCad;
import br.com.CurriculoAi.exceptions.ResourceNotFoundException;
import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UsuarioUtils {

    private final UsuarioCadRepository usuarioCadRepository;

    //Busca o usuário através do JWT
    public UsuarioCad me(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null){

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticadp");
        }

        Object principal = authentication.getPrincipal();
        UsuarioCad usuarioAutenticado;

        if (principal instanceof UsuarioCad){
            usuarioAutenticado = (UsuarioCad) principal;
        }
        else if (principal instanceof UserDetails){

            String email = ((UserDetails) principal).getUsername();

            usuarioAutenticado = usuarioCadRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        }
        else{
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        UsuarioCad usuarioBuscado = usuarioCadRepository.findById(usuarioAutenticado.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        return usuarioBuscado;
    }
}
