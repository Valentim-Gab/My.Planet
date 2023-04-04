package site.my.planet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "personal_work")
public class PersonalWork {

    @Id
    @Column(name = "id_personal_work")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPersonalWork;

    @Column(name = "personal_work_name")
    private String personalWorkName;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;

    @Column(name = "link")
    private String link;

    @Column(name = "public")
    private Boolean publicWork;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
