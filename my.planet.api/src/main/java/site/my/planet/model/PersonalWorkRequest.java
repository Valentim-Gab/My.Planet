package site.my.planet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalWorkRequest {
    private long idPersonalWork;
    private String personalWorkName;
    private String description;
    private String img;
    private String link;
    private Boolean publicWork;
    private Long idUser;
    private Long idCategory;
}
