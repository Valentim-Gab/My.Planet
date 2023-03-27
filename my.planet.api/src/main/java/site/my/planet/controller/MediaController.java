package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import site.my.planet.service.MediaService;
import site.my.planet.model.Media;
import site.my.planet.model.MediaRequest;

@RestController
@RequestMapping("/media")
public class MediaController {

    private MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/{id}")
    public Optional<Media> get(@PathVariable("id") long id) {
        return this.mediaService.get(id);
    }

    @GetMapping()
    public ArrayList<Media> getAll() {
        return this.mediaService.getAll();
    }

    @GetMapping("/personal-work/{id}")
    public Media getByPersonalWork(@PathVariable("id") long id) {
        return this.mediaService.getByPersonalWork(id);
    }

    @GetMapping("/img/{imgName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("imgName") Optional<String> imgName) {
        return this.mediaService.getImg(imgName);
    }

    @SneakyThrows
    @PostMapping()
    public void save(@RequestParam("media") String media,
            @RequestParam("img") Optional<MultipartFile> multipartFile) {

        MediaRequest mediaRequest = new ObjectMapper().readValue(
                media, MediaRequest.class);

        this.mediaService.save(mediaRequest, multipartFile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        this.mediaService.delete(id);
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public void update(@PathVariable("id") long id,
            @RequestParam("media") String media,
            @RequestParam("img") Optional<MultipartFile> multipartFile,
            @RequestParam("deleteImage") Optional<String> deleteImage) {

        MediaRequest mediaRequest = new ObjectMapper().readValue(
                media, MediaRequest.class);

        this.mediaService.update(id, mediaRequest, multipartFile, deleteImage);
    }
}
