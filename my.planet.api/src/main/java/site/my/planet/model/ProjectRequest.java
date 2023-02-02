package site.my.planet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    private long idProject;
    private String projectName;
    private String description;
    private String img;
    private String link;
    private Long idUser;
}
