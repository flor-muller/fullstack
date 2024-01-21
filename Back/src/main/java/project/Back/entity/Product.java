package project.Back.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name="game")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long game_id;
    private String gameName;
    private String description;
    private Integer stock;
    //inactive is to identify if a specific product was deleted from the product list by the Admin. false: product is available true: product was deleted.
    private boolean inactive;
    private double totalScore;
    private Double price;


    //many to one relation game-category
    @ManyToOne()
    @JoinColumn(name = "category_category_id", referencedColumnName = "category_id")
    @JsonBackReference("category")
    private Category category;

    //many to many relation game-user
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "favs",
            joinColumns = {@JoinColumn(name = "game_game_id", referencedColumnName = "game_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_user_id", referencedColumnName = "user_id")}
    )
    private Set<User> users;

    //many to one relation game-rent
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference("game")
    private List<Rent> rentsGames;

    //many to one relation game-images
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference("game")
    private List<Images> imagesGames;

    //many to one relation game-score
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference("game")
    private List<Score> scoresGames;


    //one to one relation game-characteristic
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "characteristic_characteristic_id", referencedColumnName = "characteristic_id")
    private Characteristic characteristic;

    public void setScore(double avgScore) {
    }

    //TO STRING
    @Override
    public String toString() {
        return "GAME {" +
                "ID: " + game_id +
                ", name: " + gameName +
                ", category: " + category +
                ", description: " + description +
                ", stock: " + stock +
                ", stars: " + totalScore +
                ", price per day: " + price +
                '}';
    }


}
