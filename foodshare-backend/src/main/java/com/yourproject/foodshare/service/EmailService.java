package com.yourproject.foodshare.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value; // Import Value
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // Inject the 'from' address from application.properties
    @Value("${spring.mail.from:#{null}}") // Default to null if not set
    private String configuredFromAddress;

    public void sendPasswordResetEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // --- ADDED LOGGING ---
        String actualFromAddress = configuredFromAddress != null ? configuredFromAddress : "DEFAULT_SENDER_NOT_CONFIGURED";
        System.out.println("Attempting to send email FROM: " + actualFromAddress + " TO: " + toEmail);
        // --- END LOGGING ---

        // Set 'From' address if configured, otherwise rely on mail server default
        if (configuredFromAddress != null) {
             message.setFrom(configuredFromAddress); // Explicitly set the From address
        }
       
        message.setTo(toEmail);
        message.setSubject("FoodShare - Password Reset Request");
        
        String resetUrl = "http://localhost:5173/reset-password?token=" + token; 
        
        message.setText("You requested a password reset for your FoodShare account.\n\n" +
                        "Click the link below to reset your password:\n" +
                        resetUrl + "\n\n" +
                        "If you did not request this, please ignore this email.\n" +
                        "This link will expire in 1 hour.");

        try {
            mailSender.send(message);
            System.out.println("Password reset email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending password reset email to " + toEmail + ": " + e.getMessage());
            // Log the full stack trace for detailed debugging
            e.printStackTrace(); 
        }
    }
}
