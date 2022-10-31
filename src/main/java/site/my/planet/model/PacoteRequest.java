package site.my.planet.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacoteRequest {
    private long id_pacote;
    private char tipo;
    private String conteudo;
    private long id_projeto;
}
