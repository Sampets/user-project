package io.github.sampets.userbackend.user;

import java.time.LocalDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Surname is mandatory")
    private String surname;
    private Gender gender;
    @Past(message = "Birthdate must be in the past")
    private LocalDate birthdate;

    @OneToOne(cascade = CascadeType.ALL)    //to propagate changes (add, delete) to parent
    @JoinColumn(name = "address_id")    //on one-to-one relationships used to change the column name
    private Address address;
}
