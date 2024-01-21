package project.Back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name="category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long category_id;

    private String catName;

    private String description;

    private String color;

    //Number of products per category
    private Integer productQuantity;


    //inactive is to identify if a specific category was deleted from the category list by the Admin. false: category is available true: category was deleted.
    private boolean inactive;


    //One to many relation category-game
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference("category")
    private List<Product> gamesCategory;

    //TO STRING
    @Override
    public String toString() {
        return "CATEGORY {" +
                "ID: " + category_id +
                ", name: " + catName +
                ", description: " + description +
                '}';
    }
}
