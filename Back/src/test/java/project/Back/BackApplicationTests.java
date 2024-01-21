package project.Back;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import project.Back.controller.CharacteristicController;
import project.Back.dto.UserDTO;
import project.Back.entity.User;
import project.Back.exception.BadRequestException;
import project.Back.repository.IUserRepository;
import project.Back.service.ICharacteristicService;
import project.Back.service.impl.EmailService;
import project.Back.service.impl.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

	@Mock
	private IUserRepository userRepository;

	@Mock
	private ObjectMapper mapper;

	@Mock
	private EmailService emailService;

	@InjectMocks
	private UserService userService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void sendEmail_validUser_shouldSendEmail() throws BadRequestException {
		// Arrange
		User user = new User();
		user.setUser_id(1L);
		user.setFirstname("John");
		user.setEmail("test@example.com");

		when(userRepository.findByUserId(1L)).thenReturn(new UserDTO());
		doNothing().when(emailService).sendMail(anyString(), anyString(), anyString());

		// Act
		userService.sendEmail(user);

		// Assert
		verify(emailService, times(1)).sendMail(eq("test@example.com"), eq("Gracias por registrarse en la aplicacion"),
				contains("Hola John, gracias por registrarte."));
	}

	@Test
	void changeState_userIdExistsAndWithin3Days_shouldActivateUser() {
		// Arrange
		User user = new User();
		user.setUser_id(1L);
		user.setDate(LocalDateTime.now().minusDays(2));

		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		when(userRepository.save(user)).thenReturn(user);

		// Act
		String result = userService.changeState(1L);

		// Assert
		assertEquals("El usuario ha sido activado correctamente", result);
		assertTrue(user.isEnabled());
		verify(userRepository, times(1)).save(user);
	}

	@Test
	void changeState_userIdExistsAndMoreThan3Days_shouldDeleteUser() {
		// Arrange
		User user = new User();
		user.setUser_id(1L);
		user.setDate(LocalDateTime.now().minusDays(4));

		when(userRepository.findById(1L)).thenReturn(Optional.of(user));

		// Act
		String result = userService.changeState(1L);

		// Assert
		assertEquals("Han pasado más de 3 días y debe realizar el registro nuevamente", result);
		verify(userRepository, times(1)).deleteById(1L);
	}

	@Test
	void changeState_userIdDoesNotExist_shouldReturnErrorMessage() {
		// Arrange
		when(userRepository.findById(1L)).thenReturn(Optional.empty());

		// Act
		String result = userService.changeState(1L);

		// Assert
		assertEquals("No se encontró un usuario con el ID proporcionado", result);
		verify(userRepository, never()).deleteById(anyLong());
		verify(userRepository, never()).save(any(User.class));
	}
}