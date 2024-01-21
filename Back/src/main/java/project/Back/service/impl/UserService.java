package project.Back.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import project.Back.dto.UserDTO;
import project.Back.entity.User;
import project.Back.exception.BadRequestException;
import project.Back.repository.IUserRepository;
import project.Back.service.IUserService;
import project.Enum.Role;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@EnableCaching
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private EmailService emailService;

    
    

    @Override
    public void sendEmail(User user) throws BadRequestException {
        String activationLink = null;
        //String baseUrl = "http://localhost:5173";
        String baseUrl = "http://bucket-grupo6c5-hosting.s3-website.us-east-2.amazonaws.com";
        String userIdString = String.valueOf(user.getUser_id());
        
        activationLink = UriComponentsBuilder.fromHttpUrl(baseUrl)
        .pathSegment("login", userIdString)
        .toUriString();
        
        String mensaje = "Hola " + user.getFirstname() + ", gracias por registrarte. " +
        "Para activar tu cuenta, ingresa al siguiente enlace: " + activationLink;
        emailService.sendMail(user.getEmail(),"Gracias por registrarse en la aplicacion", mensaje);

    }



    @Override
    public String updateRolUser(String email, String role) {
        Role rolFinal;
        Optional<User> user = userRepository.findByEmail(email);
        if (role.equals("ADMIN")) {
            rolFinal=Role.ADMIN;
        }else{
            rolFinal=Role.USER;
        }
        user.get().setRole(rolFinal);
        userRepository.save(user.get());
        return "Cambio Realizado";
    }

    @Override
    public UserDTO findUser(Long id) {
        return userRepository.findByUserId(id);
    }


    @Override
    public void deleteUser(Long ID) {
        userRepository.deleteById(ID);
    }

    @Override
    public Set<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        Set<UserDTO> usersDTO = new HashSet<>();
        for (User user : users) {
            usersDTO.add(mapper.convertValue(user, UserDTO.class));
        }
        return usersDTO;
    }
    //No tocar, es de autorización
    @Override
    public UserDTO findByUserEmail(String email) {
       Optional<User> user = userRepository.findByEmail(email); 
        UserDTO userDTO = null;
        if (user.isPresent()) {
            userDTO = mapper.convertValue(user, UserDTO.class);
        }
        return userDTO;
    }


    @Override
    public String changeState(Long user_id) {
        
        String message = null;
        Optional<User> userDTO = userRepository.findById(user_id);
        
        if (userDTO.isPresent()) {
            User user = userDTO.get();
            LocalDateTime fechaRegistro = user.getDate();
            LocalDateTime fechaActual = LocalDateTime.now();
        
            long diasTranscurridos = ChronoUnit.DAYS.between(fechaRegistro, fechaActual);
            if (diasTranscurridos > 3) {
                message = "Han pasado más de 3 días y debe realizar el registro nuevamente";
                userRepository.deleteById(user_id);
            } else {
                user.setEnabled(true);
                userRepository.save(user);
                message = "El usuario ha sido activado correctamente";
            }
        } else {
            message = "No se encontró un usuario con el ID proporcionado";
        }
        
        return message;  
    }

}
