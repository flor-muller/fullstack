package project.Back.auth;

import java.time.LocalDateTime;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import project.Back.config.JwtService;
import project.Back.entity.User;
import project.Back.exception.BadRequestException;
import project.Back.repository.IUserRepository;
import project.Back.service.IUserService;
import project.Enum.Role;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final IUserService userService;


    public AuthenticationResponse register(RegisterRequest request) throws BadRequestException {
        if (!repository.findByEmail(request.getEmail()).isPresent()) {  
            LocalDateTime hora=LocalDateTime.now();
            var user=User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .dni(request.getDni())
            .date(hora)
            .enabled(false)
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
            repository.save(user);
            userService.sendEmail(user);
            var jwtToken= jwtService.generateToken(user);
            return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
        }
        return null;
    }

public AuthenticationResponse authenticate(AuthenticationRequest request) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
    ));
    
    SecurityContextHolder.getContext().setAuthentication(authentication);
    
    var user = repository.findByEmail(request.getEmail()).orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    var roleName = user.getRole().name();
    char firstLetterName = user.getFirstname().charAt(0);
    char firstLetterLastName = user.getLastname().charAt(0);
    String avatar = String.valueOf(firstLetterName)+String.valueOf(firstLetterLastName);


    
    return AuthenticationResponse.builder()
            .token(jwtToken)
            .rol(roleName)
            .avatar(avatar)
            .build();
}
    
}
