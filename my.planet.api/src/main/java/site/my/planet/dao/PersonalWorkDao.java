package site.my.planet.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.my.planet.model.PersonalWork;

@Repository
public interface PersonalWorkDao extends JpaRepository<PersonalWork, Long> {

  @Query(value = "SELECT * FROM personal_work p WHERE p.id_user = :id", nativeQuery = true)
  public ArrayList<PersonalWork> findByUser(@Param("id") long id);
}
