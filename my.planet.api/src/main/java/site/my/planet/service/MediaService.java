package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import site.my.planet.dao.MediaDao;
import site.my.planet.dao.PersonalWorkDao;
import site.my.planet.model.Media;
import site.my.planet.model.MediaRequest;
import site.my.planet.model.PersonalWork;
import site.my.planet.util.ImageUtil;

@Service
public class MediaService {

    private MediaDao mediaDao;
    private PersonalWorkDao personalWorkDao;
    private ImageUtil imageUtil;

    public MediaService(MediaDao mediaDao, PersonalWorkDao personalWorkDao, ImageUtil imageUtil) {
        this.mediaDao = mediaDao;
        this.personalWorkDao = personalWorkDao;
        this.imageUtil = imageUtil;
    }

    public Optional<Media> get(long id) {
        return this.mediaDao.findById(id);
    }

    public ArrayList<Media> getAll() {
        return (ArrayList<Media>) this.mediaDao.findAll();
    }

    public Media getByPersonalWork(long id) {
        return this.mediaDao.findByPersonalWork(id);
    }

    public ResponseEntity<byte[]> getImg(Optional<String> imgName) {
        if (imgName.isPresent() && imgName.get() != null)
            return this.imageUtil.get(imgName.get(), "media");
        else
            return ResponseEntity.badRequest().body(null);
    }

    public void save(MediaRequest mediaRequest,
            Optional<MultipartFile> multipartFile) {
        PersonalWork personalWork = new PersonalWork();
        personalWork = this.personalWorkDao.getReferenceById(mediaRequest.getIdPersonalWork());

        Media media = new Media();
        media.setFirstVideo(mediaRequest.getFirstVideo());
        media.setSecondVideo(mediaRequest.getSecondVideo());
        media.setPersonalWork(personalWork);

        media = this.mediaDao.save(media);
        media = this.mediaDao.getReferenceById(media.getIdMedia());

        if (multipartFile.isPresent())
            media.setImg(this.imageUtil.save(
                    multipartFile.get(), media.getIdMedia(), "media"));
        else
            media.setImg(null);

        this.personalWorkDao.flush();
    }

    public void delete(long id) {
        this.mediaDao.deleteById(id);
    }

    public void update(long id, MediaRequest mediaRequest,
            Optional<MultipartFile> multipartFile, Optional<String> deleteImage) {
        Media media = new Media();
        media = this.mediaDao.getReferenceById(id);
        media.setFirstVideo(mediaRequest.getFirstVideo());
        media.setSecondVideo(mediaRequest.getSecondVideo());

        if (multipartFile.isPresent())
            media.setImg(this.imageUtil.save(
                    multipartFile.get(), id, "media"));
        else if (deleteImage.isPresent())
            media.setImg(null);
        else
            media.setImg(media.getImg());

        this.mediaDao.flush();
    }
}
