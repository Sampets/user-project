package io.github.sampets.userbackend;

import io.github.sampets.userbackend.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class UserbackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(UserbackendApplication.class, args);
	}

	@Autowired
	private UserController userController;

	@Override
	public void run(String... args) throws Exception {

		Address address = new Address(1L, "Work Ave. 52", "House Street 3");
		User user = new User(1L, "John", "Doe", Gender.MALE,
				LocalDate.of(2000, 6, 5), address);

		userController.createUser(user);

		address = new Address(5L, "Work Ave. 54", "Home Street 76" );
		user = new User(2L, "Jane", "Doe", Gender.FEMALE,
				LocalDate.of(1995, 5, 5), address);

		userController.createUser(user);

		address = new Address(3L, "Work Ave. 1", "Home Street 1" );
		user = new User(3L, "Giorgos", "Papadopoulos", Gender.MALE,
				LocalDate.of(1966, 12, 3), address);

		userController.createUser(user);

	}
}
