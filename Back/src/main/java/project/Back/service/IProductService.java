package project.Back.service;

import org.springframework.cglib.core.Local;
import project.Back.dto.ProductDTO;
import project.Back.entity.Product;
import project.Back.exception.BadRequestException;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IProductService {
    
    void createProduct(ProductDTO productDTO) throws BadRequestException;

    //List<LocalDate> findDates(Long game_id, LocalDate startDate, LocalDate returnDate);

    List<LocalDate> findNotDates(Long game_id);

    ProductDTO findProduct(Long game_id);

    ProductDTO findProductByName(String gameName);

    List<ProductDTO> findProductsByCategoryName(String catName);

    //List<ProductDTO> findProductByDates(LocalDate startDate, LocalDate returnDate);
    //List<ProductDTO> findProductByDatesAndCategory(LocalDate startDate, LocalDate returnDate, String catName);

    void updateProduct(ProductDTO productDTO) throws BadRequestException;

    void deleteProduct(Long game_id);

    void deleteProductByName(String gameName);

    Set<ProductDTO> getAll();
}
