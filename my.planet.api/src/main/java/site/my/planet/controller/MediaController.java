package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import site.my.planet.service.MediaService;
import site.my.planet.model.MediaProject;
import site.my.planet.model.MediaProjectRequest;

@RestController
@RequestMapping("/media")
public class MediaController {

    private MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping("/{id}")
    public Optional<MediaProject> get(@PathVariable("id") long id) {
        return this.mediaService.get(id);
    }

    @GetMapping()
    public ArrayList<MediaProject> getAll() {
        return this.mediaService.getAll();
    }

    @GetMapping("/project/{id}")
    public MediaProject getByProjects(@PathVariable("id") long id) {
        return this.mediaService.getByProject(id);
    }

    @GetMapping("/img/{imgName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("imgName") Optional<String> imgName) {
        return this.mediaService.getImg(imgName);
    }

    @SneakyThrows
    @PostMapping()
    public void save(@RequestParam("mediaProject") String mediaProject,
            @RequestParam("img") Optional<MultipartFile> multipartFile) {

        MediaProjectRequest mediaProjectRequest = new ObjectMapper().readValue(
                mediaProject, MediaProjectRequest.class);

        this.mediaService.save(mediaProjectRequest, multipartFile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        this.mediaService.delete(id);
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public void update(@PathVariable("id") long id,
            @RequestParam("mediaProject") String mediaProject,
            @RequestParam("img") Optional<MultipartFile> multipartFile,
            @RequestParam("deleteImage") Optional<String> deleteImage) {

        MediaProjectRequest mediaProjectRequest = new ObjectMapper().readValue(
                mediaProject, MediaProjectRequest.class);

        this.mediaService.update(id, mediaProjectRequest, multipartFile, deleteImage);
    }
}
