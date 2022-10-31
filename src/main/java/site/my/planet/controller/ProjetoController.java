package site.my.planet.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.my.planet.service.ProjetoService;
import site.my.planet.model.Projeto;
import site.my.planet.model.ProjetoRequest;

@RestController
@RequestMapping("/projeto")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    @GetMapping("/{id}")
    public Optional<Projeto> getProjeto(@PathVariable("id") long id) {
        return this.projetoService.getProjeto(id);
    }

    @GetMapping()
    public ArrayList<Projeto> getProjetos() {
        return this.projetoService.getProjetos();
    }

    @PostMapping()
    public void cadastro(@RequestBody ProjetoRequest projetoRequest) {
        this.projetoService.save(projetoRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteProjeto(@PathVariable("id") long id) {
        this.projetoService.delete(id);
    }

    @PutMapping("/{id}")
    public void updateProjeto(@PathVariable("id") long id, @RequestBody Projeto projeto) {
        this.projetoService.update(id, projeto);
    }
}
