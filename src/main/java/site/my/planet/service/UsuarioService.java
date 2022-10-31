package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import site.my.planet.dao.UsuarioDao;
import site.my.planet.model.Usuario;

@Service
public class UsuarioService {

    @Autowired
    UsuarioDao usuarioDao;

    public UsuarioService() {

    }

    public Optional<Usuario> getUsuario(long id) {
        return this.usuarioDao.findById(id);
    }

    public ArrayList<Usuario> getUsuarios() {
        return (ArrayList<Usuario>) this.usuarioDao.findAll();
    }

    public void save(Usuario usuario) {
        usuario.setPassword(
                new BCryptPasswordEncoder().encode(usuario.getPassword()));

        this.usuarioDao.save(usuario);
    }

    public void delete(long id) {
        this.usuarioDao.deleteById(id);
    }

    public void update(long id, Usuario usuario) {
        Usuario u = new Usuario();
        u = this.usuarioDao.getReferenceById(id);
        u.setUsername(usuario.getUsername());
        u.setEmail(usuario.getEmail());
        u.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        this.usuarioDao.flush();
    }
}
