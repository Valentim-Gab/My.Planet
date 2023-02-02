package site.my.planet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.my.planet.dao.UserDao;
import site.my.planet.model.UserModel;
import site.my.planet.security.JWTAutentication;

@RestController
@RequestMapping("/login")
public class LoginController {

    private AuthenticationManager authenticationManager;
    private UserDao userDao;

    public LoginController(UserDao userDao, AuthenticationManager authenticationManager) {
        this.userDao = userDao;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping()
    public ResponseEntity<Object> autenticacao(@RequestBody UserModel user) {
        try {
            final Authentication authenticate = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail().toLowerCase(),
                            user.getPassword()));

            if (authenticate.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authenticate);

                user = this.userDao.findByEmail(user.getEmail().toLowerCase());

                String token = new JWTAutentication().tokenGenerator(user);
                user.setToken(token);
                user.setPassword("");

                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Email ou senha inválidos", HttpStatus.BAD_REQUEST);
    }
}
