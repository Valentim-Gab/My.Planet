package site.my.planet.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import site.my.planet.dao.CommentaryDao;
import site.my.planet.model.Commentary;

@Service
public class CommentaryService {

    private CommentaryDao commentaryDao;

    public CommentaryService(CommentaryDao commentaryDao) {
        this.commentaryDao = commentaryDao;
        ;
    }

    public Commentary get(long id) {
        Commentary commentary = new Commentary();
        commentary = this.commentaryDao.findById(id).get();

        return commentary;
    }

    public ArrayList<Commentary> getAll() {
        return (ArrayList<Commentary>) this.commentaryDao.findAll();
    }

    public ArrayList<Commentary> getByPersonalWork(long id) {
        return this.commentaryDao.findByPersonalWork(id);
    }

    public void save(Commentary commentary) {
        this.commentaryDao.save(commentary);
    }

    public void delete(long id) {
        this.commentaryDao.deleteById(id);
    }
}
