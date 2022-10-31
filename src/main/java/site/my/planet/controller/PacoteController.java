package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import site.my.planet.service.PacoteService;
import site.my.planet.model.Pacote;
import site.my.planet.model.PacoteRequest;

@RestController
@RequestMapping("/pacote")
public class PacoteController {

    @Autowired
    private PacoteService pacoteService;

    public PacoteController(PacoteService pacoteService) {
        this.pacoteService = pacoteService;
    }

    @GetMapping("/{id}")
    public Optional<Pacote> getPacote(@PathVariable("id") long id) {
        return this.pacoteService.getPacote(id);
    }

    @GetMapping()
    public ArrayList<Pacote> getPacotes() {
        return this.pacoteService.getPacotes();
    }

    @PostMapping()
    public void cadastro(@RequestBody PacoteRequest pacoteRequest) {
        this.pacoteService.save(pacoteRequest);
    }

    @DeleteMapping("/{id}")
    public void deletePacote(@PathVariable("id") long id) {
        this.pacoteService.delete(id);
    }

    @PutMapping("/{id}")
    public void updatePacote(@PathVariable("id") long id, @RequestBody Pacote pacote) {
        this.pacoteService.update(id, pacote);
    }
}
