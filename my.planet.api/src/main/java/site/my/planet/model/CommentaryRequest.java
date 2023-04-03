package site.my.planet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentaryRequest {
  private long idCommentary;
  private String txtCommentary;
  private long idUser;
  private long idPersonalWork;
}
