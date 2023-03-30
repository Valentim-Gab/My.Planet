package site.my.planet.service;

import java.util.ArrayList;
import org.springframework.stereotype.Service;
import site.my.planet.dao.CommentaryDao;
import site.my.planet.model.Commentary;
import site.my.planet.model.CommentaryRequest;
import site.my.planet.model.PersonalWork;
import site.my.planet.model.UserModel;

@Service
public class CommentaryService {

    private UserService userService;
    private PersonalWorkService personalWorkService;
    private CommentaryDao commentaryDao;

    public CommentaryService(CommentaryDao commentaryDao, PersonalWorkService personalWorkService,
            UserService userService) {
        this.commentaryDao = commentaryDao;
        this.personalWorkService = personalWorkService;
        this.userService = userService;
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
        // UserModel user = this.userService.get(commentaryRequest.getIdUser());
        // PersonalWork personalWork =
        // this.personalWorkService.get(commentaryRequest.getIdPersonalWork()).get();

        // Commentary commentary = new Commentary(
        // 0,
        // commentaryRequest.getTxtCommentary(),
        // user,
        // personalWork);

        this.commentaryDao.save(commentary);
    }

    // public void delete(long id) {
    // this.commentaryDao.deleteById(id);
    // }

    // public void update(long id, UserModel user) {

    // }
}
