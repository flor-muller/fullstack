package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.Back.dto.CharacteristicDTO;
import project.Back.service.ICharacteristicService;

@CrossOrigin
@RestController
@RequestMapping("/characteristics")
public class CharacteristicController {
    public ICharacteristicService characteristicService;

    @Autowired
    public void setCharacteristicService(ICharacteristicService characteristicService) {
        this.characteristicService = characteristicService;
    }

    //-POST to create a new characteristic (createCharacteristic)
    @PostMapping("/createcharacteristic")
    public ResponseEntity<?> registerNewChacteristic(@RequestBody CharacteristicDTO characteristicDTO)  {
        ResponseEntity<String> response = null;
        characteristicService.createCharacteristic(characteristicDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Caracterítica registrada con éxito.");
        return response;
    }

    //-GET to search a characteristic by ID (findCharacteristic)
    @GetMapping("/searcharacteristic/{characteristic_id}")
    public CharacteristicDTO searchCharacteristicByID(@PathVariable Long characteristic_id) {
        return characteristicService.findCharacteristic(characteristic_id);
    }

    //-PUT to update an existing characteristic (updateCharacteristic)
    @PutMapping("/updatecharacteristic")
    public ResponseEntity<?> modifyCharacteristic(@RequestBody CharacteristicDTO characteristicDTO) {
        ResponseEntity<String> response = null;
        characteristicService.updateCharacteristic(characteristicDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Característica actualizada con éxito.");
        return response;
    }

    //-DELETE to delete a characteristic by ID (deleteCharacteristic)
    @DeleteMapping("/deletecharacteristic/{characteristic_id}")
    public ResponseEntity<?> deleteCharacteristic(@PathVariable Long characteristic_id) {
        ResponseEntity<String> response = null;
        characteristicService.deleteCharacteristic(characteristic_id);
        response = ResponseEntity.status(HttpStatus.OK).body("Característica de id(" + characteristic_id + ") eliminada con éxito.");
        return response;
    }

}
