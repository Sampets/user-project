package io.github.sampets.userbackend.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow( () -> new RuntimeException("User not found") );
    }

    public void deleteUserById(Long id){
        if (!userRepository.existsById(id)){
            throw new RuntimeException("User with id "+ id + " already deleted or does not exist");
        }
        userRepository.deleteById(id);
    }
}
