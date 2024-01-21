package project.Back.service;

import project.Back.dto.CategoryDTO;
import project.Back.exception.BadRequestException;

import java.util.Set;

public interface ICategoryService {

    void createCategory(CategoryDTO categoryDTO) throws BadRequestException;

    CategoryDTO findCategory(Long ID);

    CategoryDTO findCategoryByName(String catName);

    void updateCategory(CategoryDTO categoryDTO) throws BadRequestException;

    void deleteCategory(Long ID);

    void deleteCategoryByName(String catName);

    Set<CategoryDTO> getAll();
}
