package project.Back.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.Back.dto.CharacteristicDTO;
import project.Back.entity.Characteristic;
import project.Back.repository.ICharacteristicRepository;
import project.Back.service.ICharacteristicService;

@Service
public class CharacteristicService implements ICharacteristicService {

    @Autowired
    ICharacteristicRepository characteristicRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void createCharacteristic(CharacteristicDTO characteristicDTO) {
        Characteristic characteristic = mapper.convertValue(characteristicDTO, Characteristic.class);
        characteristicRepository.save(characteristic);
    }

    @Override
    public CharacteristicDTO findCharacteristic(Long characteristic_id) {
        Characteristic characteristic = characteristicRepository.findById(characteristic_id).orElse(null);
        CharacteristicDTO characteristicDTO = mapper.convertValue(characteristic, CharacteristicDTO.class);
        return characteristicDTO;
    }

    @Override
    public void updateCharacteristic(CharacteristicDTO characteristicDTO) {
        Characteristic characteristic = mapper.convertValue(characteristicDTO, Characteristic.class);
        characteristicRepository.save(characteristic);
    }

    @Override
    public void deleteCharacteristic(Long characteristic_id) {
        characteristicRepository.deleteById(characteristic_id);
    }

}
