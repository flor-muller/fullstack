package project.Back.dto;

import lombok.Data;
import project.Enum.Role;

@Data
public class UserDTO {
    private Long user_id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String dni;
    private Role role;
}
