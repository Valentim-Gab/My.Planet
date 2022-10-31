package site.my.planet.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import site.my.planet.dao.UsuarioDao;
import site.my.planet.model.Usuario;

@Service
public class UserDetailServiceCustom implements UserDetailsService {

    final UsuarioDao usuarioDao;

    public UserDetailServiceCustom(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = this.usuarioDao.findByEmail(email);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuário ou senha incorretos");
        } else {
            UserDetails user = User.withUsername(usuario.getEmail())
                    .password(usuario.getPassword())
                    .authorities(usuario.getPermissao()).build();

            return user;
        }
    }

}
