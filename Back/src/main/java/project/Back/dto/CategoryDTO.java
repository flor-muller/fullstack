package project.Back.dto;

import lombok.*;

@Data
public class CategoryDTO {
    private Long category_id;
    private String catName;
    private String description;
    private String color;
    private boolean inactive;
    private Integer productQuantity;


}
