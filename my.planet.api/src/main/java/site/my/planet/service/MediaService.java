package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import site.my.planet.dao.MediaProjectDao;
import site.my.planet.dao.ProjectDao;
import site.my.planet.model.MediaProject;
import site.my.planet.model.MediaProjectRequest;
import site.my.planet.model.Project;
import site.my.planet.util.ImageUtil;

@Service
public class MediaService {

    private MediaProjectDao mediaProjectDao;
    private ProjectDao projectDao;
    private ImageUtil imageUtil;

    public MediaService(MediaProjectDao mediaProjectDao, ProjectDao projectDao, ImageUtil imageUtil) {
        this.mediaProjectDao = mediaProjectDao;
        this.projectDao = projectDao;
        this.imageUtil = imageUtil;
    }

    public Optional<MediaProject> get(long id) {
        return this.mediaProjectDao.findById(id);
    }

    public ArrayList<MediaProject> getAll() {
        return (ArrayList<MediaProject>) this.mediaProjectDao.findAll();
    }

    public MediaProject getByProject(long id) {
        return this.mediaProjectDao.findByProject(id);
    }

    public ResponseEntity<byte[]> getImg(Optional<String> imgName) {
        if (imgName.isPresent() && imgName.get() != null)
            return this.imageUtil.get(imgName.get(), "media");
        else
            return ResponseEntity.badRequest().body(null);
    }

    public void save(MediaProjectRequest mediaProjectRequest,
            Optional<MultipartFile> multipartFile) {
        Project project = new Project();
        project = this.projectDao.getReferenceById(mediaProjectRequest.getIdProject());

        MediaProject mediaProject = new MediaProject();
        mediaProject.setFirstVideo(mediaProjectRequest.getFirstVideo());
        mediaProject.setSecondVideo(mediaProjectRequest.getSecondVideo());
        mediaProject.setProject(project);

        mediaProject = this.mediaProjectDao.save(mediaProject);
        mediaProject = this.mediaProjectDao.getReferenceById(mediaProject.getIdMedia());

        if (multipartFile.isPresent())
            mediaProject.setImg(this.imageUtil.save(
                    multipartFile.get(), mediaProject.getIdMedia(), "media"));
        else
            mediaProject.setImg(null);

        this.projectDao.flush();
    }

    public void delete(long id) {
        this.mediaProjectDao.deleteById(id);
    }

    public void update(long id, MediaProjectRequest mediaProjectRequest,
            Optional<MultipartFile> multipartFile, Optional<String> deleteImage) {
        MediaProject mediaProject = new MediaProject();
        mediaProject = this.mediaProjectDao.getReferenceById(id);
        mediaProject.setFirstVideo(mediaProjectRequest.getFirstVideo());
        mediaProject.setSecondVideo(mediaProjectRequest.getSecondVideo());

        if (multipartFile.isPresent())
            mediaProject.setImg(this.imageUtil.save(
                    multipartFile.get(), id, "media"));
        else if (deleteImage.isPresent())
            mediaProject.setImg(null);
        else
            mediaProject.setImg(mediaProject.getImg());

        this.mediaProjectDao.flush();
    }
}
