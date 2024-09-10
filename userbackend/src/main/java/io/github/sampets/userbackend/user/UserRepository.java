package io.github.sampets.userbackend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//    @Query("select id, name, lastName from User")
//    List<String> getAllFullNames();
}
