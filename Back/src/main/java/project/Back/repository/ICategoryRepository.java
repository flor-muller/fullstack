package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.Back.entity.Category;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {

    //Method to find category by its name
    @Query("select c from Category c where c.catName = ?1 order by c.catName")
    Optional<Category> findCategoryByName(String catName);

    //Method to list all active categories order by its name
    @Query("select c from Category c where c.inactive = false order by c.catName")
    List<Category> listActiveCategories();

    //Method to count products by category
    @Query("select count(p) from Product p where p.category.catName = ?1 and p.inactive = false and p.category.inactive = false")
    Integer countProductCategory(String catName);


}