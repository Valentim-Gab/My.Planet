package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.my.planet.dao.ProjetoDao;
import site.my.planet.dao.UsuarioDao;
import site.my.planet.model.Projeto;
import site.my.planet.model.ProjetoRequest;
import site.my.planet.model.Usuario;

@Service
public class ProjetoService {

    @Autowired
    ProjetoDao projetoDao;
    @Autowired
    UsuarioDao usuarioDao;

    public ProjetoService() {

    }

    public Optional<Projeto> getProjeto(long id) {
        return this.projetoDao.findById(id);
    }

    public ArrayList<Projeto> getProjetos() {
        return (ArrayList<Projeto>) this.projetoDao.findAll();
    }

    public void save(ProjetoRequest projetoRequest) {
        Usuario u = new Usuario();
        u = this.usuarioDao.getReferenceById(projetoRequest.getId_usuario());

        Projeto p = new Projeto();
        p.setNome(projetoRequest.getNome());
        p.setDescricao(projetoRequest.getDescricao());
        p.setImagem(projetoRequest.getImagem());
        p.setLink(projetoRequest.getLink());
        p.setUsuario(u);

        this.projetoDao.save(p);
    }

    public void delete(long id) {
        this.projetoDao.deleteById(id);
    }

    public void update(long id, Projeto projeto) {
        Projeto p = new Projeto();

        p = this.projetoDao.getReferenceById(id);
        p.setNome(projeto.getNome());
        p.setDescricao(projeto.getDescricao());
        p.setImagem(projeto.getImagem());
        p.setLink(projeto.getLink());
        this.projetoDao.flush();
    }
}
