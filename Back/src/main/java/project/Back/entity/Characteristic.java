package project.Back.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name="characteristic")
public class Characteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "characteristic_id")
    private Long characteristic_id;

    private boolean team;
    private boolean individual;
    private boolean time;
    private boolean cards;
    private boolean pocket;
    private boolean board;
    private boolean family;
    private boolean adult;


}
