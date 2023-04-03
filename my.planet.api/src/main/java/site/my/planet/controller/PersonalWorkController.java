package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import site.my.planet.service.PersonalWorkService;
import site.my.planet.model.PersonalWork;
import site.my.planet.model.PersonalWorkRequest;

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
    public void delete(@PathVariable("id") long id) {
        this.personalWorkService.delete(id);
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
}
