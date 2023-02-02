package site.my.planet.security;

import java.util.Date;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import site.my.planet.model.UserModel;

public class JWTAutentication {

    public static final long TOKEN_EXPIRATION = Duration.ofMinutes(5).toMillis();
    public static final String TOKEN_KEY = "ProgramacaoOrientadaAObjetosParaAWeb2Valentim";

    public String tokenGenerator(UserModel user) {

        final Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getId());
        claims.put("permission", user.getPermission());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, TOKEN_KEY)
                .compact();
    }

    public String getSubToken(String token) {
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
                .setSigningKey(TOKEN_KEY)
                .parseClaimsJws(token.replace("Bearer", ""))
                .getBody();
    }
}
