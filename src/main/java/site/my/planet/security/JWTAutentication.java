package site.my.planet.security;

import java.util.Date;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import site.my.planet.model.Usuario;

public class JWTAutentication {

    public static final long TOKEN_EXPIRA = Duration.ofMinutes(5).toMillis();
    public static final String TOKEN_SENHA = "ProgramacaoOrientadaAObjetosParaAWeb2Valentim";

    public String geraToken(Usuario usuario) {

        final Map<String, Object> claims = new HashMap<>();
        claims.put("sub", usuario.getEmail());
        claims.put("permissão", usuario.getPermissao());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRA))
                .signWith(SignatureAlgorithm.HS256, TOKEN_SENHA)
                .compact();
    }

    public String getUsernameToken(String token) {
        if (token != null) {
            return this.parseToken(token).getSubject();
        } else {
            return null;
        }
    }

    public Boolean isTokenExpirado(String token) {
        return this.parseToken(token).getExpiration().before(new Date());
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(TOKEN_SENHA)
                .parseClaimsJws(token.replace("Bearer", ""))
                .getBody();
    }
}
