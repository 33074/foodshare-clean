package com.yourproject.foodshare.config;

import com.yourproject.foodshare.security.CustomOAuth2UserService;
import com.yourproject.foodshare.security.JwtAuthFilter; // Keep JWT Filter
import com.yourproject.foodshare.security.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter; // Keep for API requests
    private final AuthenticationProvider authenticationProvider;
    private final CustomOAuth2UserService customOAuth2UserService; // Inject custom service
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler; // Inject success handler

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless API
                .cors(Customizer.withDefaults()) // Enable CORS defined elsewhere
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/food/**").permitAll() 
                        .requestMatchers(HttpMethod.POST, "/api/claims").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/forgot-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/reset-password").permitAll()
                        // OAuth2 endpoints needed for the flow
                        .requestMatchers("/oauth2/**", "/login/oauth2/code/**").permitAll() 
                        // Actuator health check (if using)
                         .requestMatchers("/actuator/**").permitAll()

                        // Secured endpoints (require authentication via JWT *or* session from OAuth redirect)
                        .requestMatchers(HttpMethod.POST, "/api/food/donate").authenticated() 
                        .requestMatchers(HttpMethod.GET, "/api/claims/my-claims").authenticated()
                        
                        // Default: All other requests must be authenticated
                        .anyRequest().authenticated() 
                )
                // --- Configure OAuth2 Login ---
                .oauth2Login(oauth2 -> oauth2
                        // Optional: customize login page URL if needed
                        // .loginPage("/login") 
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService) // Use our custom service
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler) // Use our custom success handler
                        // Optional: configure failure handler
                        // .failureHandler(authenticationFailureHandler()) 
                )
                // --- End OAuth2 Login ---

                // --- Session Management ---
                // Keep stateless for API calls authenticated via JWT
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ) 
                
                .authenticationProvider(authenticationProvider) // For username/password auth
                // Add JWT filter *before* username/password filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); 

        return http.build();
    }
}
