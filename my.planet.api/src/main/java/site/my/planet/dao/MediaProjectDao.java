package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.my.planet.model.MediaProject;

@Repository
public interface MediaProjectDao extends JpaRepository<MediaProject, Long> {

  @Query(value = "SELECT * FROM media_project m WHERE m.id_project = :id", nativeQuery = true)
  public MediaProject findByProject(@Param("id") long id);
}
