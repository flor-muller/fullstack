package project.Back.auth;

import java.util.Map;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import project.Back.dto.UserDTO;

import project.Back.exception.BadRequestException;

import project.Back.service.impl.UserService;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor

public class AuthenticationController {

    private final AuthenticationService service;
    private final UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody RegisterRequest request
    ) throws BadRequestException{
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
            
    }
    
    @GetMapping("/registerProcess/{user_id}")
    public String changeState(@PathVariable Long user_id){
        
        return userService.changeState(user_id);
    }
    @PostMapping("/searchUserEmail")
    public UserDTO searchUserEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        UserDTO userDTO = userService.findByUserEmail(email);
        return userDTO;
    }

    @GetMapping("/listAll")
    public Set<UserDTO> getAllUser(){
        
        return userService.getAll();
    }

    @PutMapping("/updateRolUser")
    public String updateRolUser(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String role = request.get("role");
        return userService.updateRolUser(email, role);
       
    }

}
