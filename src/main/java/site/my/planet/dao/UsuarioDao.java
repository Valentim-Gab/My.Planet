package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Usuario;

@Repository
public interface UsuarioDao extends JpaRepository<Usuario, Long> {

    public Usuario findByEmail(String email);
}
