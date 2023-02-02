package site.my.planet.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Project;

@Repository
public interface ProjectDao extends JpaRepository<Project, Long> {

  @Query(value = "SELECT * FROM project p WHERE p.id_user = :id", nativeQuery = true)
  public ArrayList<Project> findByUser(@Param("id") long id);
}
