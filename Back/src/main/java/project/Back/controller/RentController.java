package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.Back.dto.RentDTO;
import project.Back.exception.BadRequestException;
import project.Back.service.IRentService;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/rents")
public class RentController {

    @Autowired
    IRentService rentService;

    //-POST to create a new rent (createRent)
    @PostMapping("/createrent")
    public ResponseEntity<?> registerNewRent(@RequestBody RentDTO rentDTO) {
        ResponseEntity<String> response = null;
        rentService.createRent(rentDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Alquiler registrado con éxito.");
        return response;
    }

    //-GET to search a rent by ID (findRent)
    @GetMapping("/searchrent/{rent_id}")
    public RentDTO searchRentByID(@PathVariable Long rent_id) {
        return rentService.findRent(rent_id);
    }

    //-GET to search rents by game name (findProductByUserEmail)
    @GetMapping("/searchrentbygame/{gameName}")
    public Collection<RentDTO> searchRentByGameName(@PathVariable String gameName) {
        return rentService.findRentByProductName(gameName);
    }

    //-GET to search rents by user email (findRentByUserEmail)
    @GetMapping("/searchrentbyuser/{email}")
    public Collection<RentDTO> searchRentByUserEmail(@PathVariable String email) {
        return rentService.findReservationByUserEmail(email);
    }

    //-PUT to update an existing rent (updateRent)
    @PutMapping("/updaterent")
    public ResponseEntity<?> modifyRent(@RequestBody RentDTO rentDTO) {
        ResponseEntity<String> response = null;
        rentService.updateRent(rentDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Alquiler actualizado con éxito.");
        return response;
    }

    //-DELETE to delete a rent by ID (deleteRent)
    @DeleteMapping("/deleterent/{rent_id}")
    public ResponseEntity<?> deleteRent(@PathVariable Long rent_id) {
        ResponseEntity<String> response = null;
        rentService.deleteRent(rent_id);
        response = ResponseEntity.status(HttpStatus.OK).body("Alquiler de id(" + rent_id + ") eliminado con éxito.");
        return response;
    }


    //-GET to search list of all rents (getAll)
    @GetMapping("/listrent")
    public Collection<RentDTO> searchAllRents(){
        return rentService.getAll();
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

}
