package project.Back.service;

import project.Back.dto.RentDTO;
import project.Back.entity.Rent;
import project.Back.exception.BadRequestException;

import java.util.List;
import java.util.Set;

public interface IRentService {

    void createRent(RentDTO rentDTO);

    RentDTO findRent(Long ID);

    List<RentDTO> findRentByProductName(String gameName);

    List<RentDTO> findReservationByUserEmail(String email);

    void updateRent(RentDTO rentDTO);

    void deleteRent(Long ID);

    Set<RentDTO> getAll();
}
