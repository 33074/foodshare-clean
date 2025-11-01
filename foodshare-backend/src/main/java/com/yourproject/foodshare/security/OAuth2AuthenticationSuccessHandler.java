package com.yourproject.foodshare.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor; // Use Lombok
import org.springframework.beans.factory.annotation.Value; // For frontend URL
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder; // For building URL

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor // Automatically creates constructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService; // Inject renamed JwtService

    // Inject frontend URL from properties or use default
    @Value("${app.oauth2.redirect-uri:http://localhost:5173/login-success}")
    private String frontendRedirectBaseUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        // Generate JWT token using the Authentication object
        String token = jwtService.generateToken(authentication);

        // Build the redirect URL with the token as a query parameter
        String redirectUrl = UriComponentsBuilder.fromUriString(frontendRedirectBaseUri)
                .queryParam("token", token) // No need to manually URL encode with UriComponentsBuilder
                .encode(StandardCharsets.UTF_8)
                .build().toUriString();

        // Perform the redirect
        response.sendRedirect(redirectUrl);
    }
}
