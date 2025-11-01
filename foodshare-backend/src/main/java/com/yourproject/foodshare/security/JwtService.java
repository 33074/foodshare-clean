package com.yourproject.foodshare.security;

import com.yourproject.foodshare.entity.User; // Import your User entity
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication; // Import Authentication
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component // Changed from @Service
public class JwtService { // Renamed from JwtTokenUtil

    @Value("${jwt.secret.key}") // Use the secret from application.properties
    private String SECRET_KEY;

    // Token validity: e.g. 1 day (adjust as needed)
    private final long validityInMs = 24 * 60 * 60 * 1000L;

    // Helper method to get the signing key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generate token from Authentication object (used by success handler)
    public String generateToken(Authentication authentication) {
        // Assuming your CustomOAuth2UserService sets the principal correctly
        // Or adapt based on how user details are available in Authentication
        String username;
        Map<String, Object> claims = new HashMap<>();

        if (authentication.getPrincipal() instanceof User) {
             User user = (User) authentication.getPrincipal();
             username = user.getEmail();
             claims.put("firstName", user.getFirstName());
             claims.put("lastName", user.getLastName());
             claims.put("roles", user.getAuthorities().stream()
                                  .map(GrantedAuthority::getAuthority)
                                  .collect(Collectors.toList()));

        } else if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.core.user.OAuth2User) {
             org.springframework.security.oauth2.core.user.OAuth2User oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();
             username = oauthUser.getAttribute("email"); // Get email from OAuth2 attributes
             claims.put("firstName", oauthUser.getAttribute("given_name"));
             claims.put("lastName", oauthUser.getAttribute("family_name"));
             // Note: Roles might not be directly available here unless added by CustomOAuth2UserService
             // Add default or fetch from DB if necessary based on email

        } else if (authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
             org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
             username = userDetails.getUsername(); // Email in your case
             claims.put("roles", userDetails.getAuthorities().stream()
                                  .map(GrantedAuthority::getAuthority)
                                  .collect(Collectors.toList()));
             // Need to fetch first/last name from DB based on username (email) if needed
        }
        else {
            username = authentication.getName(); // Fallback
        }


        return generateToken(username, claims);
    }


    // Generate token from subject (email) and claims map
    public String generateToken(String subject, Map<String, Object> claims) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityInMs);
        Key key = getSignInKey(); // Get the key

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

     // --- Keep methods needed by JwtAuthFilter if you still use it ---
     public String extractUsername(String token) {
         return Jwts.parserBuilder().setSigningKey(getSignInKey()).build()
                    .parseClaimsJws(token).getBody().getSubject();
     }

     public boolean isTokenValid(String token, org.springframework.security.core.userdetails.UserDetails userDetails) {
         final String username = extractUsername(token);
         return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
     }

     private boolean isTokenExpired(String token) {
         Date expiration = Jwts.parserBuilder().setSigningKey(getSignInKey()).build()
                              .parseClaimsJws(token).getBody().getExpiration();
         return expiration.before(new Date());
     }
    // --- End methods needed by JwtAuthFilter ---
}
