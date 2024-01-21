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
@Table(name="score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private Long score_id;
    private Integer stars;

    @ManyToOne()
    @JoinColumn(name = "game_game_id", referencedColumnName = "game_id")
    @JsonBackReference("game")
    private Product game;
}
