package io.github.sampets.userbackend.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String workAddress;
    private String homeAddress;
}
