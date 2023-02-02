package site.my.planet.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import site.my.planet.dao.UserDao;
import site.my.planet.model.UserModel;

@Service
public class UserDetailById {

  final UserDao userDao;

  public UserDetailById(UserDao userDao) {
    this.userDao = userDao;
  }

  public UserDetails loadUserById(long id) throws UsernameNotFoundException {
    Optional<UserModel> user = this.userDao.findById(id);

    if (user == null)
      throw new UsernameNotFoundException("Usuário ou senha incorretos");
    else {
      UserDetails userDetails = User.withUsername(user.get().getEmail())
          .password(user.get().getPassword()).authorities(user.get().getPermission()).build();

      return userDetails;
    }
  }
}