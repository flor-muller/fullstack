package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.Back.entity.Product;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface IProductRepository  extends JpaRepository<Product, Long>{

    //Method to find product by its name
    @Query("select p from Product p where p.gameName = ?1 order by p.gameName")
    Optional<Product> findProductByName(String gameName);

    //Method to filter active products by category ordered by descending totalScore
    @Query("select p from Product p where p.category.catName = ?1 and p.inactive = false order by p.totalScore desc")
    List<Product> findProductsByCategoryName(String catName);
}
