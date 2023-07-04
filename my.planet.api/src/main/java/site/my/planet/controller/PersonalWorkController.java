package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import site.my.planet.service.PersonalWorkService;
import site.my.planet.model.PersonalWork;
import site.my.planet.model.PersonalWorkRequest;
import site.my.planet.model.UserModel;
import site.my.planet.security.JWTAutentication;

@RestController
@RequestMapping("/personal-work")
public class PersonalWorkController {

    private PersonalWorkService personalWorkService;

    public PersonalWorkController(PersonalWorkService personalWorkService) {
        this.personalWorkService = personalWorkService;
    }

    @GetMapping("/{id}")
    public Optional<PersonalWork> get(@PathVariable("id") long id) {
        return this.personalWorkService.get(id);
    }

    @GetMapping()
    public ArrayList<PersonalWork> getAll() {
        return this.personalWorkService.getAll();
    }

    @GetMapping("/user/{id}")
    public ArrayList<PersonalWork> getByUser(@PathVariable("id") long id) {
        return this.personalWorkService.getByUser(id);
    }

    @GetMapping("/user/public/{id}")
    public ArrayList<PersonalWork> getByUserPublic(@PathVariable("id") long id) {
        return this.personalWorkService.getByUserPublic(id);
    }

    @GetMapping("/img/{imgName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("imgName") Optional<String> imgName) {
        return this.personalWorkService.getImg(imgName);
    }

    @SneakyThrows
    @PostMapping()
    public PersonalWorkRequest save(@RequestParam("personal-work") String personalWork,
            @RequestParam("img") Optional<MultipartFile> multipartFile) {

        PersonalWorkRequest personalWorkRequest = new ObjectMapper().readValue(
                personalWork, PersonalWorkRequest.class);

        return this.personalWorkService.save(personalWorkRequest, multipartFile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") long id,
            HttpServletRequest request) {
        this.personalWorkService.delete(id);

        if (verifyUserLogged(id, request)) {
            //return this.userService.delete(id); 
            return new ResponseEntity<>("Teste", HttpStatus.OK);  
        }

        return new ResponseEntity<>("Não autorizado", HttpStatus.UNAUTHORIZED);  
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public void update(@PathVariable("id") long id, @RequestParam("personal-work") String personalWork,
            @RequestParam("img") Optional<MultipartFile> multipartFile,
            @RequestParam("deleteImage") Optional<String> deleteImage) {

        PersonalWorkRequest personalWorkRequest = new ObjectMapper().readValue(
                personalWork, PersonalWorkRequest.class);

        this.personalWorkService.update(id, personalWorkRequest, multipartFile, deleteImage);
    }

    @PatchMapping("/public/visibility")
    public PersonalWork updateVisibility(@RequestBody PersonalWork personalWork) {
        return this.personalWorkService.updateVisibility(personalWork);
    }

    public boolean verifyUserLogged(long id, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Long subToken = Long.parseLong(new JWTAutentication().getSubToken(token));
        Optional<PersonalWork> personalWork = this.personalWorkService.get(id);
        
        try {
            if (subToken instanceof Long && subToken != null && personalWork.isPresent()) {
                Long idUser = personalWork.get().getUser().getId();

                return (idUser == subToken);
            } 

            return false;
        } catch (Exception e) {
            throw e;
        }
    }
}
