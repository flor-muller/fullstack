package project.Back.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

public class CharacteristicDTO {

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
