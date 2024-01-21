package project.Back.dto;

import lombok.Data;
import project.Back.entity.*;

import java.util.List;

@Data
public class ProductDTO {
        private Long game_id;
        private String gameName;
        private String description;
        private Integer stock;
        private double totalScore;
        private Category category;
        private Double price;
        private List<Images> imagesGames;
        private Characteristic characteristic;
        private boolean inactive;

        @Override
        public String toString() {
                return "ProductDTO{" +
                        "game_id=" + game_id +
                        ", gameName='" + gameName + '\'' +
                        ", description='" + description + '\'' +
                        ", stock=" + stock +
                        ", totalScore=" + totalScore +
                        ", category=" + category +
                        ", imagesGames=" + imagesGames +
                        ", characteristic=" + characteristic +
                        ", inactive=" + inactive +
                        ", price per day=" + price +
                        '}';
        }
}
