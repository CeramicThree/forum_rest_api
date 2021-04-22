package com.ceramicthree.forum.repository;

import com.ceramicthree.forum.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    public Optional<User> findByLogin(String login);

}
