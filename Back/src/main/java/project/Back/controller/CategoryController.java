package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.Back.dto.CategoryDTO;
import project.Back.exception.BadRequestException;
import project.Back.service.ICategoryService;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    ICategoryService categoryService;

    //-POST to create a new category (createCategory)
    @PostMapping("/createcategory")
    public ResponseEntity<?> registerNewCategory(@RequestBody CategoryDTO categoryDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        categoryService.createCategory(categoryDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoria registrada con éxito.");
        return response;
    }

    //-GET to search a category by ID (findCategory)
    @GetMapping("/searchcategory/{category_id}")
    public CategoryDTO searchCategoryByID(@PathVariable Long category_id) {
        return categoryService.findCategory(category_id);
    }

    //-GET to search a category by name (findCategoryByName)
    @GetMapping("/searchcategory/name/{catName}")
    public CategoryDTO searchCategoryByName(@PathVariable String catName) {
        return categoryService.findCategoryByName(catName);
    }

    //-PUT to update an existing category (updateCategory)
    @PutMapping("/updatecategory")
    public ResponseEntity<?> modifyCategory(@RequestBody CategoryDTO categoryDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        categoryService.updateCategory(categoryDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoria actualizadoa con éxito.");
        return response;
    }

    //-DELETE to delete a category by ID (deleteCategory)
    @DeleteMapping("/deletecategory/{category_id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long category_id) {
        ResponseEntity<String> response = null;
        categoryService.deleteCategory(category_id);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoria de id(" + category_id + ") eliminada con éxito.");
        return response;
    }

    //-DELETE to delete a category by name (deleteCategoryByName)
    @DeleteMapping("/deletecategory/name/{catName}")
    public ResponseEntity<?> deleteCategoryByName(@PathVariable String catName) {
        ResponseEntity<String> response = null;
        categoryService.deleteCategoryByName(catName);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoria eliminada con éxito.");
        return response;
    }

    //-GET to search list of all categories (getAll)
    @GetMapping("/list")
    public Collection<CategoryDTO> searchAllCategories(){
        return categoryService.getAll();
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
