package com.yourproject.foodshare.service;

import com.yourproject.foodshare.dto.AuthResponse;
import com.yourproject.foodshare.dto.LoginRequest;
import com.yourproject.foodshare.dto.ResetPasswordRequest;
import com.yourproject.foodshare.dto.SignUpRequest;
import com.yourproject.foodshare.entity.Role;
import com.yourproject.foodshare.entity.User;
import com.yourproject.foodshare.repository.UserRepository;
import com.yourproject.foodshare.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Keep this import
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    // register and login methods remain the same...
    public AuthResponse register(SignUpRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .build();
        userRepository.save(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("roles", user.getAuthorities().stream()
                              .map(GrantedAuthority::getAuthority)
                              .collect(Collectors.toList()));
        var jwtToken = jwtService.generateToken(user.getEmail(), claims);
        return AuthResponse.builder().token(jwtToken).email(user.getEmail()).firstName(user.getFirstName()).build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("roles", user.getAuthorities().stream()
                              .map(GrantedAuthority::getAuthority)
                              .collect(Collectors.toList()));
        var jwtToken = jwtService.generateToken(user.getEmail(), claims);
        return AuthResponse.builder().token(jwtToken).email(user.getEmail()).firstName(user.getFirstName()).build();
    }


    // --- UPDATED METHOD ---
    public void requestPasswordReset(String email) {
        // Find the user or throw UsernameNotFoundException if not found
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("This email does not have a FoodShare account.")); // Specific message

        // If user is found, proceed with token generation and email sending
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(expiryDate);
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }
    // --- END UPDATED METHOD ---

    // resetPassword method remains the same...
    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByPasswordResetToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or expired password reset token."));
        if (user.getPasswordResetTokenExpiry() == null || user.getPasswordResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Password reset token has expired.");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        userRepository.save(user);
    }
}
