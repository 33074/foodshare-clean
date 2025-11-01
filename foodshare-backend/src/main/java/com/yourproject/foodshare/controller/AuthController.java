package com.yourproject.foodshare.controller;

import com.yourproject.foodshare.dto.AuthResponse;
import com.yourproject.foodshare.dto.LoginRequest;
import com.yourproject.foodshare.dto.ResetPasswordRequest;
import com.yourproject.foodshare.dto.SignUpRequest;
import com.yourproject.foodshare.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus; // Import HttpStatus
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Import UsernameNotFoundException
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // register and login endpoints remain the same...
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }


    // --- UPDATED ENDPOINT: Forgot Password ---
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            if (email == null || email.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email is required."));
            }
            authService.requestPasswordReset(email);
            // Return success only if user was found and email sent
            return ResponseEntity.ok(Map.of("message", "Password reset email sent."));
        } catch (UsernameNotFoundException e) {
            // If the service throws this specific exception, return 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Catch other potential errors (like email sending failure)
            System.err.println("Forgot password error: " + e.getMessage());
            // Return a generic server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body(Map.of("error", "An error occurred while processing your request."));
        }
    }
    // --- END UPDATED ENDPOINT ---

    // resetPassword endpoint remains the same...
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(request);
            return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));
        } catch (Exception e) {
            System.err.println("Reset password error: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
