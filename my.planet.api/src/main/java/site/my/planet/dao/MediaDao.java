package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Media;

@Repository
public interface MediaDao extends JpaRepository<Media, Long> {

  @Query(value = "SELECT * FROM media_personal_work m WHERE m.id_personal_work = :id", nativeQuery = true)
  public Media findByPersonalWork(@Param("id") long id);
}
