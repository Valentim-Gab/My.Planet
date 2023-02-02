package site.my.planet.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import site.my.planet.dao.UserDao;
import site.my.planet.model.UserModel;

@Service
public class UserDetailServiceCustom implements UserDetailsService {

    final UserDao userDao;

    public UserDetailServiceCustom(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = this.userDao.findByEmail(email);

        if (user == null)
            throw new UsernameNotFoundException("Usuário ou senha incorretos");
        else {
            UserDetails userDetails = User.withUsername(user.getEmail())
                    .password(user.getPassword()).authorities(user.getPermission()).build();

            return userDetails;
        }
    }
}
