package project.Back.service;

import project.Back.dto.CharacteristicDTO;


public interface ICharacteristicService {
    void createCharacteristic(CharacteristicDTO characteristicDTO);
    CharacteristicDTO findCharacteristic(Long characteristic_id);

    void updateCharacteristic(CharacteristicDTO characteristicDTO);

    void deleteCharacteristic(Long characteristic_id);

}
