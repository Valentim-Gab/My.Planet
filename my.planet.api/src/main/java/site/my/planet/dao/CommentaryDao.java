package site.my.planet.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Commentary;

@Repository
public interface CommentaryDao extends JpaRepository<Commentary, Long> {

  @Query(value = "SELECT * FROM commentary c WHERE c.id_personal_work = :id", nativeQuery = true)
  public ArrayList<Commentary> findByPersonalWork(@Param("id") long id);
}
