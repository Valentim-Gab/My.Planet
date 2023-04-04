package site.my.planet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {

  @Id
  @Column(name = "id_category")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long idCategory;

  @Column(name = "name_category")
  private String nameCategory;
}
