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
@Table(name = "media_personal_work")
public class Media {

    @Id
    @Column(name = "id_media")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMedia;

    @Column(name = "img")
    private String img;

    @Column(name = "first_video")
    private String firstVideo;

    @Column(name = "second_video")
    private String secondVideo;

    @ManyToOne
    @JoinColumn(name = "id_personal_work")
    private PersonalWork personalWork;
}
