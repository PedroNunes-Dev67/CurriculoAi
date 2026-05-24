package br.com.CurriculoAi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "usuario_cad")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioCad implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome", nullable = false, length = 80)
    private String nome;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @ManyToOne
    @JoinColumn(name = "id_area")
    private Area area;

    @Builder.Default
    @OneToMany(mappedBy = "usuarioCad", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FormacaoUser> formacoes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "usuario")
    private List<IdiomasUser> idiomas = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "usuario")
    private List<UsuarioRedeSocial> redeSocials = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "usuario")
    private List<UsuarioHabilidade> habilidades = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_user",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_role")
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "usuarioCad", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ExperienciaUser> experiencias = new ArrayList<>();

    @OneToMany(mappedBy = "usuarioCad", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<CertificacaoUser> certificacoes = new ArrayList<>();

    @OneToOne(mappedBy = "usuarioCad", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private DisponibilidadeUser disponibilidade;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

            return this.roles
                    .stream()
                    .map(role -> {
                        return new SimpleGrantedAuthority(role.getRoleEnum().name());
                    })
                    .toList();
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
