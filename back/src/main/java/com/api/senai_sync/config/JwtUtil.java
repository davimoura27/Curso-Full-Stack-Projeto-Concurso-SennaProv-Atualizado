package com.api.senai_sync.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    private Algorithm getAlgorithm(){
      return Algorithm.HMAC256(secretKey);
    }

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 10))
                .sign(getAlgorithm());
    }

    public String extractUsername(String token) {
       return JWT.require(
        getAlgorithm())
        .build()
        .verify(token)
        .getSubject();
    }

    public boolean validateToken(String token, String email) {
        DecodedJWT decodedJWT = JWT.require(getAlgorithm())
        .build()
        .verify(token);
        
        String getUser = decodedJWT.getSubject();
        Date expirationData = decodedJWT.getExpiresAt();

        return decodedJWT != null
               && getUser.equals(email)
               && expirationData != null
               && expirationData.after(new Date());
    }
}
