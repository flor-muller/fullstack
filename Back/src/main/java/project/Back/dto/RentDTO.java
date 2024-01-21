package project.Back.dto;

import lombok.Data;
import project.Back.entity.Product;
import project.Back.entity.User;


@Data
public class RentDTO {
    private Long rent_id;
    private String startDate;
    private String returnDate;
    private Double totalPrice;
    private Long game_id;
    private Long user_id;
    private Product game;
    private User user;
    private String street;
    private String number;
    private String city;
}
