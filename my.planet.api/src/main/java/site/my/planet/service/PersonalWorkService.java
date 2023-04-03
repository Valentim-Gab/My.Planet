package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import site.my.planet.dao.PersonalWorkDao;
import site.my.planet.dao.UserDao;
import site.my.planet.model.PersonalWork;
import site.my.planet.model.PersonalWorkRequest;
import site.my.planet.model.UserModel;
import site.my.planet.util.ImageUtil;

@Service
public class PersonalWorkService {

    private PersonalWorkDao personalWorkDao;
    private UserDao userDao;
    private ImageUtil imageUtil;

    public PersonalWorkService(
            PersonalWorkDao personalWorkDao,
            UserDao userDao,
            ImageUtil imageUtil) {
        this.userDao = userDao;
        this.personalWorkDao = personalWorkDao;
        this.imageUtil = imageUtil;
    }

    public Optional<PersonalWork> get(long id) {
        return this.personalWorkDao.findById(id);
    }

    public ArrayList<PersonalWork> getAll() {
        return (ArrayList<PersonalWork>) this.personalWorkDao.findAll();
    }

    public ArrayList<PersonalWork> getByUser(long id) {
        return (ArrayList<PersonalWork>) this.personalWorkDao.findByUser(id);
    }

    public ArrayList<PersonalWork> getByUserPublic(long id) {
        return (ArrayList<PersonalWork>) this.personalWorkDao.findByUserPublic(id);
    }

    public ResponseEntity<byte[]> getImg(Optional<String> imgName) {
        if (imgName.isPresent() && imgName.get() != null)
            return this.imageUtil.get(imgName.get(), "personal_work");
        else
            return ResponseEntity.badRequest().body(null);
    }

    public PersonalWorkRequest save(PersonalWorkRequest personalWorkRequest,
            Optional<MultipartFile> multipartFile) {
        UserModel user = new UserModel();
        user = this.userDao.getReferenceById(personalWorkRequest.getIdUser());

        PersonalWork personalWork = new PersonalWork();
        personalWork.setPersonalWorkName(personalWorkRequest.getPersonalWorkName());
        personalWork.setDescription(personalWorkRequest.getDescription());
        personalWork.setLink(personalWorkRequest.getLink());
        personalWork.setPublicWork(true);
        personalWork.setUser(user);

        personalWork = this.personalWorkDao.save(personalWork);

        if (multipartFile.isPresent())
            personalWork.setImg(this.imageUtil.save(
                    multipartFile.get(), personalWork.getIdPersonalWork(), "personal_work"));
        else
            personalWork.setImg(null);

        personalWork = this.personalWorkDao.getReferenceById(personalWork.getIdPersonalWork());
        this.personalWorkDao.flush();
        personalWorkRequest.setIdPersonalWork(personalWork.getIdPersonalWork());
        return personalWorkRequest;
    }

    public void delete(long id) {
        this.personalWorkDao.deleteById(id);
    }

    public void update(long id, PersonalWorkRequest personalWorkRequest,
            Optional<MultipartFile> multipartFile, Optional<String> deleteImage) {
        PersonalWork personalWork = new PersonalWork();

        personalWork = this.personalWorkDao.getReferenceById(id);
        personalWork.setPersonalWorkName(personalWorkRequest.getPersonalWorkName());
        personalWork.setDescription(personalWorkRequest.getDescription());
        personalWork.setLink(personalWorkRequest.getLink());

        if (multipartFile.isPresent())
            personalWork.setImg(this.imageUtil.save(
                    multipartFile.get(), id, "personal_work"));
        else if (deleteImage.isPresent())
            personalWork.setImg("");
        else
            personalWork.setImg(personalWork.getImg());

        this.personalWorkDao.flush();
    }

    public PersonalWork updateVisibility(PersonalWork personalWork) {
        return this.personalWorkDao.save(personalWork);
    }
}
