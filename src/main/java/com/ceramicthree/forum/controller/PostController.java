package com.ceramicthree.forum.controller;

import com.ceramicthree.forum.model.Post;
import com.ceramicthree.forum.repository.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController {
    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @GetMapping("/posts")
    public Collection<Post> getPosts(){
        return (Collection<Post>) postRepository.findAll();
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getSinglePost(@PathVariable Long id){
        Optional<Post> post = postRepository.findById(id);
        return post.map(response -> (ResponseEntity.ok().body(response))).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) throws URISyntaxException {
        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/post" + result.getId())).body(result);
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@RequestBody Post post){
        Post result = postRepository.save(post);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) throws URISyntaxException {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
