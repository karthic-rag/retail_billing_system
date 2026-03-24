package com.software.backend;

import com.software.backend.entity.Role;
import com.software.backend.entity.UserEntity;
import com.software.backend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(UserRepository repo, PasswordEncoder encoder) {
		return args -> {
			if (repo.findByEmail("admin@gmail.com").isEmpty()) {
				UserEntity user = UserEntity.builder()
						.userId(UUID.randomUUID().toString())
						.email("admin@gmail.com")
						.name("admin")
						.password(encoder.encode("123456"))
						.role(Role.ADMIN)
						.enabled(true)
						.build();

				repo.save(user);
			}
		};
	}

}
