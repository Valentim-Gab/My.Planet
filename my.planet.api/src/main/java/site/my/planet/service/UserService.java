package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import site.my.planet.dao.UserDao;
import site.my.planet.model.UserModel;
import site.my.planet.util.ImageUtil;

@Service
public class UserService {

    private UserDao userDao;
    private ImageUtil imageUtil;

    public UserService(UserDao userDao, ImageUtil imageUtil) {
        this.userDao = userDao;
        this.imageUtil = imageUtil;
    }

    public UserModel get(long id) {
        UserModel user = new UserModel();
        user = this.userDao.findById(id).get();

        return user;
    }

    public ArrayList<UserModel> getAll() {
        return (ArrayList<UserModel>) this.userDao.findAll();
    }

    public ResponseEntity<byte[]> getImg(Optional<String> imgName) {
        if (imgName.isPresent() && imgName.get() != null && imgName.get() != "")
            return this.imageUtil.get(imgName.get(), "user");
        else
            return ResponseEntity.badRequest().body(null);
    }

    public void save(UserModel user) {
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(
                new BCryptPasswordEncoder().encode(user.getPassword()));

        this.userDao.save(user);
    }

    public ResponseEntity<Object> delete(long id) {
        try {
            this.userDao.deleteById(id);

            return new ResponseEntity<>("Usuário deletado", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o usuário",
                    HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Object> update(long id, UserModel user) {
        try {
            UserModel userUpdate = new UserModel();
            userUpdate = this.userDao.getReferenceById(id);
            userUpdate.setUsername(user.getUsername());
            userUpdate.setEmail(user.getEmail().toLowerCase());
            userUpdate.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userUpdate.setDescription(user.getDescription());
            userUpdate.setImg(user.getImg());
            userUpdate.setPermission(user.getPermission());
            this.userDao.flush();

            return new ResponseEntity<>("Usuário atualizado", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o usuário",
                    HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Object> updateSpecific(long id, String description,
            Optional<MultipartFile> multipartFile,
            Optional<String> deleteImage) {
        try {
            UserModel userUpdate = new UserModel();
            userUpdate = this.userDao.getReferenceById(id);
            userUpdate.setDescription(description);

            if (multipartFile.isPresent())
                userUpdate.setImg(this.imageUtil.save(multipartFile.get(), id, "user"));
            else if (deleteImage.isPresent())
                userUpdate.setImg("");
            else
                userUpdate.setImg(userUpdate.getImg());

            this.userDao.flush();

            return new ResponseEntity<>("Usuário deletado", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o usuário",
                    HttpStatus.BAD_REQUEST);
        }
    }
}
