package com.yourproject.foodshare.security;

import com.yourproject.foodshare.entity.Role; // Import your Role enum
import com.yourproject.foodshare.entity.User;
import com.yourproject.foodshare.repository.UserRepository;
import lombok.RequiredArgsConstructor; // Use Lombok constructor injection
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Automatically creates constructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        // Extract profile info from Google
        Map<String, Object> attributes = oauth2User.getAttributes();
        String email = (String) attributes.get("email");
        String firstName = (String) attributes.getOrDefault("given_name", ""); // Use given_name
        String lastName = (String) attributes.getOrDefault("family_name", ""); // Use family_name

        // Find or create user in your database
        Optional<User> existingUserOpt = userRepository.findByEmail(email);
        User user;

        if (existingUserOpt.isPresent()) {
            user = existingUserOpt.get();
            // Update names if they changed or were missing
            user.setFirstName(firstName);
            user.setLastName(lastName);
            // Optionally update profile picture URL if you store it
        } else {
            // Create a new user
            user = User.builder()
                    .email(email)
                    .firstName(firstName)
                    .lastName(lastName)
                    .password(passwordEncoder().encode(java.util.UUID.randomUUID().toString())) // Generate random secure password
                    .role(Role.RECIPIENT) // Assign a default role
                    .build();
        }
        
        userRepository.save(user);

        // Return a new OAuth2User that includes your User details or roles if needed
        // For simplicity, we can return the default and let the SuccessHandler fetch user by email
        // Or create a custom principal that wraps your User entity
        return new DefaultOAuth2User(
                user.getAuthorities(), // Use authorities from your User entity
                attributes,
                "email"); // Use email as the 'name' attribute key
    }

     // Helper bean to encode generated password (if not already available)
     // If you have PasswordEncoder defined elsewhere (@Bean), remove this
     private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
         return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
     }
}
