package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Projeto;

@Repository
public interface ProjetoDao extends JpaRepository<Projeto, Long> {

}
