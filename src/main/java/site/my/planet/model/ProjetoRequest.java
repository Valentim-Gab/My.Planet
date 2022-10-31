package site.my.planet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoRequest {

    private long id_projeto;

    private String nome;

    private String descricao;

    private String imagem;

    private String link;

    private Long id_usuario;
}
