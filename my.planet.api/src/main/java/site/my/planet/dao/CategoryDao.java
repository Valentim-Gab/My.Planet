package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.my.planet.model.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Long> {

}
