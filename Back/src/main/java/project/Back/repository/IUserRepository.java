package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import project.Back.dto.UserDTO;
import project.Back.entity.User;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.user_id = :user_id")
    UserDTO findByUserId(@Param("user_id") Long user_id);

}
