package project.Back.service;
import project.Back.dto.UserDTO;
import project.Back.entity.User;
import project.Back.exception.BadRequestException;

import java.util.Set;

public interface IUserService {

    void sendEmail(User user) throws BadRequestException;

    String updateRolUser(String email, String role);

    UserDTO findUser(Long id);

    void deleteUser(Long ID);

    Set<UserDTO> getAll();
    
    String changeState(Long id);

    UserDTO findByUserEmail(String email);



}