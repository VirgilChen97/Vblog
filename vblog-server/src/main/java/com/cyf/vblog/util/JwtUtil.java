package com.cyf.vblog.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    /**
     * Check whether a JWT is valid
     * @param jwt
     * @param userDetails
     * @param base64Security
     * @return Whether the JWT is valid
     */
    public static Boolean validateJWT(String jwt, UserDetails userDetails, String base64Security){
        String username = parseJWT(jwt, base64Security).get("username", String.class);
        return username.equals(userDetails.getUsername()) && !isExpired(jwt,base64Security);
    }

    /**
     * Check whether a JWT is expired
     * @param jwt
     * @param base64Security
     * @return Whether the JWT is expired
     */
    private static Boolean isExpired(String jwt, String base64Security){
        return parseJWT(jwt, base64Security).getExpiration().before(new Date());
    }

    /**
     * Parse a JWT to Claims
     * @param jsonWebToken JWT
     * @param base64Security Base64 encoded secret
     * @return Claims contained in that JWT
     */
    public static Claims parseJWT(String jsonWebToken, String base64Security){
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                    .parseClaimsJws(jsonWebToken).getBody();
            return claims;
        }
        catch(Exception ex) {
            return null;
        }
    }

    /**
     * Generate a new JWT with given info
     * @param name
     * @param userId
     * @param issuer
     * @param TTLMillis
     * @param base64Security
     * @return Generated JWT
     */
    public static String createJWT(String name, Long userId, String issuer, long TTLMillis, String base64Security)
    {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //生成签名密钥
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //添加构成JWT的参数
        JwtBuilder builder = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .claim("username", name)
                .claim("id", userId)
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);
        //添加Token过期时间
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }

        //生成JWT
        return builder.compact();
    }
}


