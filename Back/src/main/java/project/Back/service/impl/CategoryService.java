package project.Back.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.Back.dto.CategoryDTO;
import project.Back.entity.Category;
import project.Back.exception.BadRequestException;
import project.Back.repository.ICategoryRepository;
import project.Back.service.ICategoryService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public void createCategory(CategoryDTO categoryDTO) throws BadRequestException {
        Category category = mapper.convertValue(categoryDTO, Category.class);
        if (category.isInactive() && categoryRepository.findCategoryByName(category.getCatName()).isPresent()) {
            String message = "El nombre "+ categoryDTO.getCatName() + " de la categoria que se desea registrar ya existia y ha sido reestablecido";
            category.setInactive(false);
            categoryRepository.save(category);
            throw new BadRequestException(message);
        } else if (categoryRepository.findCategoryByName(category.getCatName()).isPresent()){
            String messageError = "El nombre "+ categoryDTO.getCatName() + " de la categoria que se desea registrar ya existe";
            throw new BadRequestException(messageError);
        } else {
            categoryRepository.save(category);
        }
    }

    @Override
    public CategoryDTO findCategory(Long category_id) {
        Category category = categoryRepository.findById(category_id).orElse(null);
        CategoryDTO categoryDTO = null;
        if (!category.isInactive()) {
            Integer productCount = categoryRepository.countProductCategory(category.getCatName());
            category.setProductQuantity(productCount);
            categoryRepository.save(category);
            categoryDTO = mapper.convertValue(category, CategoryDTO.class);
        }
        return categoryDTO;
    }

    @Override
    public CategoryDTO findCategoryByName(String catName) {
        Optional<Category> category = categoryRepository.findCategoryByName(catName);
        CategoryDTO categoryDTO = null;
        if (category.isPresent() && !(category.get().isInactive())) {
            Integer productCount = categoryRepository.countProductCategory(category.get().getCatName());
            category.get().setProductQuantity(productCount);
            categoryRepository.save(category.get());
            categoryDTO = mapper.convertValue(category, CategoryDTO.class);
        }
        return categoryDTO;
    }

    @Override
    public void updateCategory(CategoryDTO categoryDTO) throws BadRequestException {
        Category category = mapper.convertValue(categoryDTO, Category.class);
        if (!category.isInactive() && categoryRepository.findCategoryByName(category.getCatName()).isPresent()) {
            categoryRepository.save(category);
        }else{
            String message = "El id "+ categoryDTO.getCategory_id() + " de la categoría que se desea actualizar no existe.";
            throw new BadRequestException(message);
        }
    }

    @Override
    public void deleteCategory(Long ID) {
        Category category = categoryRepository.findById(ID).orElse(null);
        if (category != null) {
            category.setInactive(true);
            categoryRepository.save(category);
        }
    }

    @Override
    public void deleteCategoryByName(String catName) {
        Category category = categoryRepository.findCategoryByName(catName).orElse(null);
        if (category != null) {
            category.setInactive(true);
            categoryRepository.save(category);
        }
    }


   @Override
   public Set<CategoryDTO> getAll() {

       List<Category> categories = categoryRepository.listActiveCategories();
       Set<CategoryDTO> categoriesDTO = new HashSet<>();
       Integer productCount = 0;
       for (Category category : categories) {
           productCount = categoryRepository.countProductCategory(category.getCatName());
           category.setProductQuantity(productCount);
           categoryRepository.save(category);
           categoriesDTO.add(mapper.convertValue(category, CategoryDTO.class));
       }
       return categoriesDTO;
   }
}
