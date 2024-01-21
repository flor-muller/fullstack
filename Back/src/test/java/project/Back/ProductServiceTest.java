package project.Back;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import project.Back.dto.ProductDTO;
import project.Back.entity.Product;
import project.Back.repository.ICategoryRepository;
import project.Back.repository.IProductRepository;
import project.Back.service.impl.ProductService;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ProductServiceTest {

    @Mock
    private IProductRepository productRepository;

    @Mock
    private ICategoryRepository categoryRepository;

    @Mock
    private ObjectMapper mapper;

    @InjectMocks
    private ProductService productService;

    public ProductServiceTest() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findProduct_inactiveProductId_shouldReturnNull() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setGame_id(productId);
        product.setInactive(true);

        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // Act
        ProductDTO result = productService.findProduct(productId);

        // Assert
        assertNull(result);
        verify(productRepository, times(1)).findById(productId);
    }
    @Test
    void findProductByName_inactiveProductName_shouldReturnNull() {
        // Arrange
        String productName = "PruebaTest";
        Product product = new Product();
        product.setGameName(productName);
        product.setInactive(true);

        when(productRepository.findProductByName(productName)).thenReturn(Optional.of(product));

        // Act
        ProductDTO result = productService.findProductByName(productName);

        // Assert
        assertNull(result);
        verify(productRepository, times(1)).findProductByName(productName);
    }
}

