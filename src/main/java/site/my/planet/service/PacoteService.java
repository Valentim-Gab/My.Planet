package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.my.planet.dao.PacoteDao;
import site.my.planet.dao.ProjetoDao;
import site.my.planet.dao.UsuarioDao;
import site.my.planet.model.Pacote;
import site.my.planet.model.PacoteRequest;
import site.my.planet.model.Projeto;

@Service
public class PacoteService {

    @Autowired
    ProjetoDao projetoDao;
    @Autowired
    PacoteDao pacoteDao;
    @Autowired
    UsuarioDao usuarioDao;

    public PacoteService() {

    }

    public Optional<Pacote> getPacote(long id) {
        return this.pacoteDao.findById(id);
    }

    public ArrayList<Pacote> getPacotes() {
        return (ArrayList<Pacote>) this.pacoteDao.findAll();
    }

    public void save(PacoteRequest pacoteRequest) {
        Projeto p = new Projeto();
        p = this.projetoDao.getReferenceById(pacoteRequest.getId_projeto());

        Pacote pa = new Pacote();
        pa.setTipo(pacoteRequest.getTipo());
        pa.setConteudo(pacoteRequest.getConteudo());
        pa.setProjeto(p);
        this.pacoteDao.save(pa);
    }

    public void delete(long id) {
        this.pacoteDao.deleteById(id);
    }

    public void update(long id, Pacote pacote) {
        Pacote pa = new Pacote();
        pa = this.pacoteDao.getReferenceById(id);
        pa.setTipo(pacote.getTipo());
        pa.setConteudo(pacote.getConteudo());
        this.pacoteDao.flush();
    }
}
