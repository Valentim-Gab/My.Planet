package site.my.planet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.Optional;
import site.my.planet.model.UserModel;
import site.my.planet.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserModel get(@PathVariable("id") long id) {
        return this.userService.get(id);
    }

    @GetMapping()
    public ArrayList<UserModel> getAll() {
        return this.userService.getAll();
    }

    @GetMapping("/img/{imgName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("imgName") Optional<String> imgName) {
        return this.userService.getImg(imgName);
    }

    @PostMapping()
    public ResponseEntity<Object> save(@RequestBody UserModel user) {
        try {
            this.userService.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Email já cadastrado!", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        this.userService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") long id, @RequestBody UserModel user) {
        try {
            this.userService.update(id, user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Email já cadastrado!", HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/{id}")
    public void updateSpecific(@PathVariable("id") long id,
            @RequestParam("description") String description,
            @RequestParam("img") Optional<MultipartFile> multipartFile,
            @RequestParam("deleteImage") Optional<String> deleteImage) {
        this.userService.updateSpecific(id, description, multipartFile, deleteImage);
    }
}
