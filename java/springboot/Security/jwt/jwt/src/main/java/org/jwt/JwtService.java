package org.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

// This service handles all operations related to JSON Web Tokens (JWT) such as generation, validation, and extraction of claims.
public class JwtService {

    // Injects the JWT expiration time from the application properties.
    @Value("${jwt-expiration}")
    private long jwtExpiration;

    // Injects the secret key used to sign the JWT from the application properties.
    @Value("${jwt.secret-key}")
    private String secretKey;

    // Extracts the username from the JWT token. This is typically the "subject" of the token.
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);  //The Claims::getSubject is a method reference that references the getSubject method in the Claims interface
    }

    // A generic method to extract any claim from the JWT token.
    // It accepts a token and a function that specifies which claim to extract.
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token); // Retrieves all claims from the token.
        return claimsResolver.apply(claims); // Applies the provided function to extract the specific claim.
    }

    // Extracts all claims from the JWT token by parsing it. This method uses the secret key to decode and verify the token.
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(key()) // Sets the signing key (used to verify the token's signature).
                .build()
                .parseClaimsJws(token) // Parses the token to retrieve the claims.
                .getBody(); // Returns the claims body.
    }

    // Generates a JWT token for the given user details with an empty set of additional claims.
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Generates a JWT token with additional claims and user details.
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildJwtToken(claims, userDetails, jwtExpiration); // Builds the JWT token with the provided claims and expiration time.
    }

    // Builds the JWT token using the specified claims, user details, and expiration time.
    private String buildJwtToken(Map<String, Object> extraClaims,
                                 UserDetails userDetails,
                                 long jwtExpiration) {
        // Extracts the authorities (roles/permissions) from the user details.
        List<String> authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // Constructs the JWT token by setting claims, subject, issue date, expiration date, and signing it with the secret key.
        return Jwts
                .builder()
                .setClaims(extraClaims) // Sets any extra claims provided.
                .setSubject(userDetails.getUsername()) // Sets the subject (typically the username).
                .setIssuedAt(new Date(System.currentTimeMillis())) // Sets the current date/time as the issue date.
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Sets the expiration date/time.
                .claim("authorities", authorities) // Adds the user's authorities as a claim in the token.
                .signWith(key()) // Signs the token using the secret key.
                .compact(); // Builds the token and returns it as a compact string.
    }

    // Decodes the secret key from Base64 format and creates a Key object that can be used for signing or verifying the token.
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    // Validates the JWT token by checking if the username in the token matches the user's username and if the token is not expired.
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token); // Extracts the username from the token.
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token); // Checks username match and token expiration.
    }

    // Checks if the JWT token has expired by comparing its expiration date to the current date.
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extracts the expiration date from the JWT token.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
