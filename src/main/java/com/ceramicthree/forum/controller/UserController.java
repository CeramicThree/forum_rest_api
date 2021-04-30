package com.ceramicthree.forum.controller;

import com.ceramicthree.forum.model.Post;
import com.ceramicthree.forum.model.User;
import com.ceramicthree.forum.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public Collection<User> getUsers(){
        return (Collection<User>) userRepository.findAll();
    }

    @GetMapping("/users/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login){
        Optional<User> user = userRepository.findByLogin(login);
        return user.map(response -> (ResponseEntity.ok().body(response))).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws URISyntaxException {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
