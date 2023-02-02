package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;
import site.my.planet.service.ProjectService;
import site.my.planet.model.Project;
import site.my.planet.model.ProjectRequest;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/{id}")
    public Optional<Project> get(@PathVariable("id") long id) {
        return this.projectService.get(id);
    }

    @GetMapping()
    public ArrayList<Project> getAll() {
        return this.projectService.getAll();
    }

    @GetMapping("/user/{id}")
    public ArrayList<Project> getByUser(@PathVariable("id") long id) {
        return this.projectService.getByUser(id);
    }

    @GetMapping("/img/{imgName}")
    public ResponseEntity<byte[]> getImg(@PathVariable("imgName") Optional<String> imgName) {
        return this.projectService.getImg(imgName);
    }

    @SneakyThrows
    @PostMapping()
    public ProjectRequest save(@RequestParam("project") String project,
            @RequestParam("img") Optional<MultipartFile> multipartFile) {

        ProjectRequest projectRequest = new ObjectMapper().readValue(
                project, ProjectRequest.class);

        return this.projectService.save(projectRequest, multipartFile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        this.projectService.delete(id);
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public void update(@PathVariable("id") long id, @RequestParam("project") String project,
            @RequestParam("img") Optional<MultipartFile> multipartFile,
            @RequestParam("deleteImage") Optional<String> deleteImage) {

        ProjectRequest projectRequest = new ObjectMapper().readValue(
                project, ProjectRequest.class);

        this.projectService.update(id, projectRequest, multipartFile, deleteImage);
    }
}
