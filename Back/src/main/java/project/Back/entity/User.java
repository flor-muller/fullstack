package project.Back.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.Enum.Role;
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="user")
public class User implements UserDetails{

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String firstname;
    private String email;
    private String password;
    private String lastname;
    private String dni;
    private Boolean enabled;
    private LocalDateTime date;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    //many to many relation game-user
    @ManyToMany(mappedBy = "users")
    private Set<Product> games;

    //many to one relation user-rent
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference("user")
    private List<Rent> rentsUsers;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getPassword() {
        return password;
        
    }
}
