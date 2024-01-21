package project.Back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name="images")
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "images_id")
    private Long images_id;
    private String url;
    private boolean inactive;
    private boolean principal;

    @ManyToOne()
    @JoinColumn(name = "game_game_id", referencedColumnName = "game_id")
    @JsonBackReference("game")
    private Product game;
}
