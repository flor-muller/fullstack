package project.Back.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.Back.dto.ProductDTO;
import project.Back.entity.Product;
import project.Back.entity.Rent;
import project.Back.exception.BadRequestException;
import project.Back.repository.ICategoryRepository;
import project.Back.repository.IProductRepository;
import project.Back.repository.IRentRepository;
import project.Back.repository.IScoreRepository;
import project.Back.service.IProductService;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService{

    @Autowired
    IProductRepository productRepository;

    @Autowired
    IRentRepository rentRepository;

    @Autowired
    ICategoryRepository categoryRepository;

    @Autowired
    ScoreService scoreService;

    @Autowired
    ObjectMapper mapper;

    /*public int getStockDisponibleEnFecha(Product producto, LocalDate startDate, LocalDate returnDate) {
        int stockDisponible = producto.getStock();

        List<Rent> reservas = rentRepository.findByProductoAndFechaReserva(producto.getGame_id(), startDate, returnDate);

        for (Rent reserva : reservas) {
            stockDisponible -= rentRepository.cantidad(reserva.getGame().getGame_id(), startDate, returnDate);
        }

        return stockDisponible;
    }*/

    @Override
    public void createProduct(ProductDTO productDTO) throws BadRequestException {
        Product product = mapper.convertValue(productDTO, Product.class);
        if (product.isInactive() && productRepository.findProductByName(product.getGameName()).isPresent()) {
            String message = "El nombre "+ productDTO.getGameName() + " del producto que se desea registrar ya existía y ha sido reestablecido";
            product.setInactive(false);
            productRepository.save(product);
            throw new BadRequestException(message);
        } else if(productRepository.findProductByName(product.getGameName()).isPresent()){
            String messageError = "El nombre "+ productDTO.getGameName() + " del producto que se desea registrar ya existe";
            throw new BadRequestException(messageError);
        } else {
            productRepository.save(product);
            categoryRepository.save(product.getCategory());
            
        }
    }

    /*@Override
    public List<LocalDate> findDates(Long game_id, LocalDate startDate, LocalDate returnDate) {
        Optional<Product> optionalProduct = productRepository.findById(game_id);
        List<LocalDate> availableDates = new ArrayList<>();

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            List<LocalDate> allDates = startDate.datesUntil(returnDate.plusDays(1)).collect(Collectors.toList());

            for (LocalDate date : allDates) {
                if (getStockDisponibleEnFecha(product, date, date) > 0) {
                    availableDates.add(date);
                }
            }
        }

        return availableDates;
    }*/

    @Override
    public List<LocalDate> findNotDates(Long game_id) {
        Product product = productRepository.findById(game_id).orElse(null);
        int stockDisponible = product.getStock();
        List<Rent> rents = rentRepository.findReservationByProductName(product.getGameName());
        List<LocalDate> noDisponible = new ArrayList<>();

        for (Rent rent : rents) {
            LocalDate fecha = rent.getStartDate();

            do {
                int cant = rentRepository.cantidad(game_id, fecha);
                if (cant >= stockDisponible && !noDisponible.contains(fecha)) {
                    noDisponible.add(fecha);
                }

                fecha = fecha.plusDays(1);

                if (fecha.getDayOfMonth() == 1 && fecha.getMonthValue() == 12) {
                    fecha = fecha.withDayOfMonth(1).withMonth(1).plusYears(1);
                } else if (fecha.getDayOfMonth() == 1) {
                    fecha = fecha.withDayOfMonth(1).plusMonths(1);
                }
            } while (!fecha.isEqual(rent.getReturnDate()) && fecha.isBefore(rent.getReturnDate()));
        }

        return noDisponible;
    }


    @Override
    public ProductDTO findProduct(Long game_id) {
        Product product = productRepository.findById(game_id).orElse(null);
        ProductDTO productDTO = null;
        if (!product.isInactive()) {
            double avgScore = scoreService.findProductAvgScore(game_id);
            product.setTotalScore(avgScore);
            productDTO = mapper.convertValue(product, ProductDTO.class);
            productDTO.setCategory(product.getCategory());
            productDTO.setImagesGames(product.getImagesGames());
            
        }

        return productDTO;
    }

    @Override
    public ProductDTO findProductByName(String gameName) {
        Optional<Product> product = productRepository.findProductByName(gameName);
        ProductDTO productDTO = null;
        if (product.isPresent() && !product.get().isInactive()) {
            double avgScore = scoreService.findProductAvgScore(product.get().getGame_id());
            product.get().setTotalScore(avgScore);
            productDTO = mapper.convertValue(product, ProductDTO.class);
            productDTO.setCategory(product.get().getCategory());
            productDTO.setImagesGames(product.get().getImagesGames());
        }
        return productDTO;
    }

    @Override
    public List<ProductDTO> findProductsByCategoryName(String catName){
        List<Product> productsByCategory = productRepository.findProductsByCategoryName(catName);
        List<ProductDTO> productsByCategoryDTO = new ArrayList<>();
        ProductDTO individualProductByCategoryDTO = null;
        for (Product product : productsByCategory) {
            double avgScore = scoreService.findProductAvgScore(product.getGame_id());
            product.setTotalScore(avgScore);
            individualProductByCategoryDTO = mapper.convertValue(product, ProductDTO.class);
            individualProductByCategoryDTO.setCategory(product.getCategory());
            individualProductByCategoryDTO.setImagesGames(product.getImagesGames());
            productsByCategoryDTO.add(individualProductByCategoryDTO);
        }
        return productsByCategoryDTO;
    }

    /*@Override
    public List<ProductDTO> findProductByDates(LocalDate startDate, LocalDate returnDate) {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsA = new ArrayList<>();
        ProductDTO productDTO;
        for (Product product : products) {
            if (getStockDisponibleEnFecha(product, startDate, returnDate) > 0) {
                productDTO = mapper.convertValue(product, ProductDTO.class);
                productsA.add(productDTO);
            }
        }
        return productsA;
    }*/

    /*@Override
    public List<ProductDTO> findProductByDatesAndCategory(LocalDate startDate, LocalDate returnDate, String catName) {
        List<Product> products = productRepository.findProductsByCategoryName(catName);
        List<ProductDTO> productsACD = new ArrayList<>();
        ProductDTO productDTO;
        for (Product product : products) {
            if (getStockDisponibleEnFecha(product, startDate, returnDate) > 0) {
                productDTO = mapper.convertValue(product, ProductDTO.class);
                productDTO.setCategory(product.getCategory());
                productsACD.add(productDTO);
            }
        }
        return productsACD;
    }*/

    @Override
    public void updateProduct(ProductDTO productDTO) throws BadRequestException{
        Product product = mapper.convertValue(productDTO, Product.class);
        if (!product.isInactive() && productRepository.findById(product.getGame_id()).isPresent()) {
            productRepository.save(product);
        }else{
            String message = "El id "+ productDTO.getGame_id() + " del producto que se desea actualizar no existe.";
            throw new BadRequestException(message);
        }
    }

    @Override
    public void deleteProduct(Long game_id){
        Product product = productRepository.findById(game_id).orElse(null);
        if (product != null) {
            product.setInactive(true);
            productRepository.save(product);
        }
    }

    @Override
    public void deleteProductByName(String gameName) {
        Product product = productRepository.findProductByName(gameName).orElse(null);
        if (product != null) {
            product.setInactive(true);
            productRepository.save(product);
        }
    }

    @Override
    public Set<ProductDTO> getAll() {
        List<Product> products = productRepository.findAll();
        Set<ProductDTO> productsDTO = new HashSet<>();
        ProductDTO individualProductDTO = null;
        for (Product product : products) {
            if (!product.isInactive()) {
                double avgScore = scoreService.findProductAvgScore(product.getGame_id());
                product.setTotalScore(avgScore);
                individualProductDTO = mapper.convertValue(product, ProductDTO.class);
                individualProductDTO.setCategory(product.getCategory());
                individualProductDTO.setImagesGames(product.getImagesGames());
                productsDTO.add(individualProductDTO);
            }
        }
        return productsDTO;
    }

}


