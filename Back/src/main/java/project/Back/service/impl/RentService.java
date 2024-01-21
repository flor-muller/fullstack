package project.Back.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.Back.dto.RentDTO;
import project.Back.entity.Product;
import project.Back.entity.Rent;
import project.Back.entity.User;
import project.Back.exception.BadRequestException;
import project.Back.repository.IProductRepository;
import project.Back.repository.IRentRepository;
import project.Back.repository.IUserRepository;
import project.Back.service.IRentService;


import java.util.*;

@Service
public class RentService implements IRentService {

    @Autowired
    private IRentRepository rentRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void createRent(RentDTO rentDTO){
        Rent rent = mapper.convertValue(rentDTO, Rent.class);
        Optional<Product> product = productRepository.findById(rentDTO.getGame_id());
        Optional<User> user = userRepository.findById(rentDTO.getUser_id());
        rent.setGame(product.get());
        rent.setUser(user.get());
        rentRepository.save(rent);
    }

    @Override
    public RentDTO findRent(Long ID) {
        Rent rent = rentRepository.findById(ID).orElse(null);
        RentDTO rentDTO = mapper.convertValue(rent, RentDTO.class);
        rentDTO.setGame(rent.getGame());
        rentDTO.setUser(rent.getUser());
        return rentDTO;
    }


    @Override
    public List<RentDTO> findRentByProductName(String gameName) {
        List<Rent> rents = rentRepository.findReservationByProductName(gameName);
        List<RentDTO> rentDTOS = new ArrayList<>();
        for (Rent rent : rents){
            RentDTO dto = mapper.convertValue(rent, RentDTO.class);
            dto.setGame(rent.getGame());
            dto.setUser(rent.getUser());
            rentDTOS.add(dto);
        }
        return rentDTOS;
    }

    @Override
    public List<RentDTO> findReservationByUserEmail(String email) {
        List<Rent> rents = rentRepository.findReservationByUserEmail(email);
        List<RentDTO> rentsDTO = new ArrayList<>();
        for (Rent rent : rents) {
            RentDTO dto = mapper.convertValue(rent, RentDTO.class);
            dto.setGame(rent.getGame());
            dto.setUser(rent.getUser());
            rentsDTO.add(dto);
        }
        return rentsDTO;
    }

    @Override
    public void updateRent(RentDTO rentDTO) {
        Optional<Product> product = productRepository.findById(rentDTO.getGame_id());
        Optional<User> user = userRepository.findById(rentDTO.getUser_id());
        Rent rent = mapper.convertValue(rentDTO, Rent.class);
        rent.setGame(product.get());
        rent.setUser(user.get());
        rentRepository.save(rent);

    }

    @Override
    public void deleteRent(Long ID) {
        rentRepository.deleteById(ID);
    }

    @Override
    public Set<RentDTO> getAll() {
        List<Rent> rents = rentRepository.findAll();
        Set<RentDTO> rentsDTO = new HashSet<>();
        for (Rent rent : rents) {
            RentDTO individualRent = mapper.convertValue(rent, RentDTO.class);
            individualRent.setGame(rent.getGame());
            individualRent.setUser(rent.getUser());
            rentsDTO.add(individualRent);
        }
        return rentsDTO;
    }
}
