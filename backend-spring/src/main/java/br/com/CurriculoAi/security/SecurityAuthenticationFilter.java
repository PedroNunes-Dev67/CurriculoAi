package br.com.CurriculoAi.security;

import br.com.CurriculoAi.entities.UsuarioCad;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final AuthenticationUserDetailsService authenticationUserDetailsService;

    public SecurityAuthenticationFilter(TokenService tokenService, AuthenticationUserDetailsService authenticationUserDetailsService) {
        this.tokenService = tokenService;
        this.authenticationUserDetailsService = authenticationUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String tokenJWT = decodeRequest(request);

        if (tokenJWT != null){

            //Valida o token através do TokenService e pesquisa o usuário pelo Email do token (Analisar essa funcionalidade se esTÁ BOA)
            String emailSubject = tokenService.validarTokenJWT(tokenJWT);
            UsuarioCad usuarioAutenticado = (UsuarioCad) authenticationUserDetailsService.loadUserByUsername(emailSubject);

            //Cria um novo contexto de autenticação e coloca os dados do usuário autenticado
            var authentication = new UsernamePasswordAuthenticationToken(usuarioAutenticado, null, usuarioAutenticado.getAuthorities());

            //Pega o contexto de segurança do sistema e adiciona a autenticação gerada para o usuário (Durante a requisição do usuário)
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request,response);
    }

    //Método responsável por pegar JWT no header Authorization
    public String decodeRequest(HttpServletRequest request){

        String header = request.getHeader("Authorization");

        if (header == null) return null;

        //Tira o Bearer e deixa apenas o JWT
        return header.replace("Bearer ", "");
    }
}