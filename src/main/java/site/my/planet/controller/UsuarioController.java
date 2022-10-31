package site.my.planet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

import site.my.planet.model.Usuario;
import site.my.planet.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuario(@PathVariable("id") long id) {
        return this.usuarioService.getUsuario(id);
    }

    @GetMapping()
    public ArrayList<Usuario> getUsuarios() {
        return this.usuarioService.getUsuarios();
    }

    @PostMapping()
    public void cadastro(@RequestBody Usuario usuario) {
        this.usuarioService.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable("id") long id) {
        this.usuarioService.delete(id);
    }

    @PutMapping("/{id}")
    public void updateCliente(@PathVariable("id") long id, @RequestBody Usuario usuario) {
        this.usuarioService.update(id, usuario);
    }
}
