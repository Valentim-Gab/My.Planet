package site.my.planet.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import site.my.planet.model.Commentary;
import site.my.planet.service.CommentaryService;

@RestController
@RequestMapping("/commentary")
public class CommentaryController {

    private CommentaryService commentaryService;

    public CommentaryController(CommentaryService commentaryService) {
        this.commentaryService = commentaryService;
    }

    @GetMapping("/{id}")
    public Commentary get(@PathVariable("id") long id) {
        return this.commentaryService.get(id);
    }

    @GetMapping()
    public ArrayList<Commentary> getAll() {
        return this.commentaryService.getAll();
    }

    @GetMapping("/work/{id}")
    public ArrayList<Commentary> getByPersonalWork(@PathVariable("id") long id) {
        return this.commentaryService.getByPersonalWork(id);
    }

    @PostMapping()
    public void save(@RequestBody Commentary commentary) {
        this.commentaryService.save(commentary);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        this.commentaryService.delete(id);
    }
}
