package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Pacote;

@Repository
public interface PacoteDao extends JpaRepository<Pacote, Long> {

}
