package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.Back.entity.Rent;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IRentRepository extends JpaRepository<Rent, Long> {

    //Method to find rent by its product's name
    @Query(value = "select r from Rent r where r.game.gameName = ?1")
    List<Rent> findReservationByProductName(String gameName);

    //Method to find rent by its user´s firstname
    @Query(value = "select r from Rent r where r.user.email = ?1")
    List<Rent> findReservationByUserEmail(String email);

    @Query("SELECT r FROM Rent r WHERE r.game.game_id = ?1 AND r.startDate <= ?2 AND r.returnDate >= ?3")
    List<Rent> findByProductoAndFechaReserva(Long gameid, LocalDate startDate, LocalDate returnDate);

    @Query("SELECT COUNT(r) FROM Rent r WHERE r.game.game_id = ?1 AND ?2 BETWEEN r.startDate AND r.returnDate")
    int cantidad(Long gameid, LocalDate date);
}
