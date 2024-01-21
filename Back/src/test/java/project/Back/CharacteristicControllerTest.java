package project.Back;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import project.Back.controller.CharacteristicController;
import project.Back.dto.CharacteristicDTO;
import project.Back.service.ICharacteristicService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class CharacteristicControllerTest {

    private CharacteristicController characteristicController;
    private ICharacteristicService characteristicService;

    @BeforeEach
    public void setUp() {
        characteristicService = mock(ICharacteristicService.class);
        characteristicController = new CharacteristicController();
        characteristicController.setCharacteristicService(characteristicService);
    }

    @Test
    public void testRegisterNewCharacteristic() {
        // Arrange
        CharacteristicDTO characteristicDTO = new CharacteristicDTO();
        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.OK)
                .body("Caracterítica registrada con éxito.");
        doNothing().when(characteristicService).createCharacteristic(any(CharacteristicDTO.class));

        // Act
        ResponseEntity<?> actualResponse = characteristicController.registerNewChacteristic(characteristicDTO);

        // Assert
        assertEquals(expectedResponse, actualResponse);
        verify(characteristicService).createCharacteristic(any(CharacteristicDTO.class));
    }

    @Test
    public void testSearchCharacteristicByID() {
        // Arrange
        Long characteristicId = 1L;
        CharacteristicDTO expectedCharacteristic = new CharacteristicDTO();
        when(characteristicService.findCharacteristic(characteristicId)).thenReturn(expectedCharacteristic);

        // Act
        CharacteristicDTO actualCharacteristic = characteristicController.searchCharacteristicByID(characteristicId);

        // Assert
        assertEquals(expectedCharacteristic, actualCharacteristic);
    }

    @Test
    public void testModifyCharacteristic() {
        // Arrange
        CharacteristicDTO characteristicDTO = new CharacteristicDTO();
        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.OK)
                .body("Característica actualizada con éxito.");
        doNothing().when(characteristicService).updateCharacteristic(any(CharacteristicDTO.class));

        // Act
        ResponseEntity<?> actualResponse = characteristicController.modifyCharacteristic(characteristicDTO);

        // Assert
        assertEquals(expectedResponse, actualResponse);
        verify(characteristicService).updateCharacteristic(any(CharacteristicDTO.class));
    }

    @Test
    public void testDeleteCharacteristic() {
        // Arrange
        Long characteristicId = 1L;
        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.OK)
                .body("Característica de id(" + characteristicId + ") eliminada con éxito.");
        doNothing().when(characteristicService).deleteCharacteristic(characteristicId);

        // Act
        ResponseEntity<?> actualResponse = characteristicController.deleteCharacteristic(characteristicId);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }
}
