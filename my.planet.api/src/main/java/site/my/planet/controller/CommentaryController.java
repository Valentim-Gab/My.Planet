package site.my.planet.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import site.my.planet.model.Commentary;
import site.my.planet.model.CommentaryRequest;
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
    public ArrayList<Commentary> getByUser(@PathVariable("id") long id) {
        return this.commentaryService.getByPersonalWork(id);
    }

    // @PostMapping()
    // public void save(@RequestBody CommentaryRequest commentaryRequest) {
    // this.commentaryService.save(commentaryRequest);
    // }

    @PostMapping()
    public void save(@RequestBody Commentary commentary) {
        this.commentaryService.save(commentary);
    }

    // @DeleteMapping("/{id}")
    // public void delete(@PathVariable("id") long id) {
    // this.commentaryService.delete(id);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<Object> update(@PathVariable("id") long id,
    // @RequestBody UserModel user) {
    // try {
    // this.commentaryService.update(id, user);
    // return new ResponseEntity<>(HttpStatus.OK);
    // } catch (Exception e) {
    // e.printStackTrace();
    // }
    // return new ResponseEntity<>("Email já cadastrado!", HttpStatus.BAD_REQUEST);
    // }
}
