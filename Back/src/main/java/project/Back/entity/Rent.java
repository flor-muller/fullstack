package project.Back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Getter
@Setter
@Entity
@Table(name="rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id")
    private Long rent_id;
    private LocalDate startDate;
    private LocalDate returnDate;
    private Double totalPrice;
    private String street;
    private String number;
    private String city;

    //many to one relation rent-user
    @ManyToOne()
    @JoinColumn(name = "user_user_id", nullable = false, referencedColumnName = "user_id")
    @JsonBackReference("user")
    private User user;

    //many to one relation rent-game
    @ManyToOne()
    @JoinColumn(name = "game_game_id", nullable = false, referencedColumnName = "game_id")
    @JsonBackReference("game")
    private Product game;

    /*
    public void setTotalPrice() {
        long daysDifference = ChronoUnit.DAYS.between(startDate, returnDate);
        this.totalPrice = game.getPrice() * daysDifference;
    }
    */

    //TO STRING
    @Override
    public String toString() {
        return "RENT {" +
                "ID: " + rent_id +
                ", game: " + game +
                ", user: " + user +
                ", start date: " + startDate +
                ", return date: " + returnDate +
                '}';
    }
}
