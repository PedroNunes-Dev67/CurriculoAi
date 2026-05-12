package br.com.CurriculoAi.security;

import br.com.CurriculoAi.repositories.UsuarioCadRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationUserDetailsService implements UserDetailsService {

    private final UsuarioCadRepository repository;

    public AuthenticationUserDetailsService(UsuarioCadRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Erro, usuário com o email: "+username+" não encontrado"));
    }
}
