package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.Back.dto.ProductDTO;
import project.Back.exception.BadRequestException;
import project.Back.service.IProductService;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    IProductService productService;

    //-POST to create a new product (createProduct)
    @PostMapping("/create")
    public ResponseEntity<?> registerNewProduct(@RequestBody ProductDTO productDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        productService.createProduct(productDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Producto registrado con éxito.");
        return response;
    }

    /*
    //-GET to get available dates
    @GetMapping("/datesavailable/{game_id}/{startDate}/{returnDate}")
    public List<LocalDate> findDatesAvailables(@PathVariable Long game_id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate) {
        return productService.findDates(game_id, startDate, returnDate);
    }
     */

    //-GET to search a product by ID (findProduct)
    @GetMapping("/search/{game_id}")
    public ProductDTO searchProductByID(@PathVariable Long game_id) {
        return productService.findProduct(game_id);
    }

    //-GET to search a product by name (findProductByName)
    @GetMapping("/search/name/{name}")
    public ProductDTO searchProductByName(@PathVariable String name) {
        return productService.findProductByName(name);
    }

    //-GET to search active products by category (findProductsByCategoryName)
   @GetMapping("/search/category/{category}")
    public List<ProductDTO> searchProductByCategory(@PathVariable String category) {
        return productService.findProductsByCategoryName(category);
    }

    /*
    //-GET to search active products by dates (findProductByDates)
    @GetMapping("/search/dates/{startDate}/{returnDate}")
    public List<ProductDTO> searchProductByDates(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate) {
        return productService.findProductByDates(startDate, returnDate);
    }

    //-GET to search active products by dates and category (findProductByDatesAndCategory)
    @GetMapping("/search/datescategory/{startDate}/{returnDate}/{catName}")
    public List<ProductDTO> searchProductByDatesAndCategory(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate, @PathVariable String catName) {
        return productService.findProductByDatesAndCategory(startDate, returnDate, catName);
    }
    */

    //-GET to search not available dates by product id (findnodates)
    @GetMapping("/search/nodates/{gameId}")
    public List<LocalDate> searchNoAvailableDates(@PathVariable Long gameId) {
        return productService.findNotDates(gameId);
    }

    //-PUT to update an existing product (updateProduct)
    @PutMapping("/update")
    public ResponseEntity<?> modifyProduct(@RequestBody ProductDTO productDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        productService.updateProduct(productDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Producto actualizado con éxito.");
        return response;
    }

    //-DELETE to delete a product by ID (deleteProduct)
    @DeleteMapping("/delete/{game_id}")
    public ResponseEntity<?> deleteProductByID(@PathVariable Long game_id) {
        ResponseEntity<String> response = null;
        productService.deleteProduct(game_id);
        response = ResponseEntity.status(HttpStatus.OK).body("Producto de id(" + game_id + ") eliminado con éxito.");
        return response;
    }

    //-DELETE to delete a product by name (deleteProductByName)
    @DeleteMapping("/delete/name/{name}")
    public ResponseEntity<?> deleteProductByName(@PathVariable String name) {
        ResponseEntity<String> response = null;
        productService.deleteProductByName(name);
        response = ResponseEntity.status(HttpStatus.OK).body("Producto eliminado con éxito.");
        return response;
    }

    //-GET to search list of all products (getAll)
    @GetMapping("/list")
    public Collection<ProductDTO> searchAllProducts(){
        return productService.getAll();
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

}
