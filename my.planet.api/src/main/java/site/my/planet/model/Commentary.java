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
@Table(name = "commentary")
public class Commentary {

  @Id
  @Column(name = "id_commentary")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long idCommentary;

  @Column(name = "txt_commentary")
  private String txtCommentary;

  @ManyToOne
  @JoinColumn(name = "id_user")
  private UserModel user;

  @ManyToOne
  @JoinColumn(name = "id_personal_work")
  private PersonalWork personalWork;
}
