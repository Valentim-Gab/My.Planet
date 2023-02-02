package site.my.planet.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import site.my.planet.dao.ProjectDao;
import site.my.planet.dao.UserDao;
import site.my.planet.model.Project;
import site.my.planet.model.ProjectRequest;
import site.my.planet.model.UserModel;
import site.my.planet.util.ImageUtil;

@Service
public class ProjectService {

    private ProjectDao projectDao;
    private UserDao userDao;
    private ImageUtil imageUtil;

    public ProjectService(
            ProjectDao projectDao,
            UserDao userDao,
            ImageUtil imageUtil) {
        this.userDao = userDao;
        this.projectDao = projectDao;
        this.imageUtil = imageUtil;
    }

    public Optional<Project> get(long id) {
        return this.projectDao.findById(id);
    }

    public ArrayList<Project> getAll() {
        return (ArrayList<Project>) this.projectDao.findAll();
    }

    public ArrayList<Project> getByUser(long id) {
        return (ArrayList<Project>) this.projectDao.findByUser(id);
    }

    public ResponseEntity<byte[]> getImg(Optional<String> imgName) {
        if (imgName.isPresent() && imgName.get() != null)
            return this.imageUtil.get(imgName.get(), "project");
        else
            return ResponseEntity.badRequest().body(null);
    }

    public ProjectRequest save(ProjectRequest projectRequest,
            Optional<MultipartFile> multipartFile) {
        UserModel user = new UserModel();
        user = this.userDao.getReferenceById(projectRequest.getIdUser());

        Project project = new Project();
        project.setProjectName(projectRequest.getProjectName());
        project.setDescription(projectRequest.getDescription());
        project.setLink(projectRequest.getLink());
        project.setUser(user);

        project = this.projectDao.save(project);

        if (multipartFile.isPresent())
            project.setImg(this.imageUtil.save(
                    multipartFile.get(), project.getIdProject(), "project"));
        else
            project.setImg(null);

        project = this.projectDao.getReferenceById(project.getIdProject());
        this.projectDao.flush();
        projectRequest.setIdProject(project.getIdProject());
        return projectRequest;
    }

    public void delete(long id) {
        this.projectDao.deleteById(id);
    }

    public void update(long id, ProjectRequest projectRequest,
            Optional<MultipartFile> multipartFile, Optional<String> deleteImage) {
        Project project = new Project();

        project = this.projectDao.getReferenceById(id);
        project.setProjectName(projectRequest.getProjectName());
        project.setDescription(projectRequest.getDescription());
        project.setLink(projectRequest.getLink());

        if (multipartFile.isPresent())
            project.setImg(this.imageUtil.save(
                    multipartFile.get(), id, "project"));
        else if (deleteImage.isPresent())
            project.setImg("");
        else
            project.setImg(project.getImg());

        this.projectDao.flush();
    }
}
