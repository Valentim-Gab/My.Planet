package site.my.planet.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.my.planet.model.UserModel;

@Repository
public interface UserDao extends JpaRepository<UserModel, Long> {

    public UserModel findByEmail(String email);
}
