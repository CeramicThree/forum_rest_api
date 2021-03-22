package com.ceramicthree.forum.controller;

import com.ceramicthree.forum.model.Comment;
import com.ceramicthree.forum.model.Post;
import com.ceramicthree.forum.repository.CommentRepository;
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
public class CommentController {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentController(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @GetMapping("/comments")
    public Collection<Comment> getComments(){
        return (Collection<Comment>) commentRepository.findAll();
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getSingleComment(@PathVariable Long id){
        Optional<Comment> comment = commentRepository.findById(id);
        return comment.map(response -> (ResponseEntity.ok().body(response))).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/comments/post/{id}")
    public ResponseEntity<?> getCommentByPostId(@PathVariable Long id){
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()){
            return ResponseEntity.ok().body(commentRepository.findByPost(post.get()));
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/comments")
    private ResponseEntity<Comment> createComment(@RequestBody Comment comment) throws URISyntaxException {
        Comment result = commentRepository.save(comment);
        return ResponseEntity.created(new URI("/api/comment" + result.getId())).body(result);
    }

    @PutMapping("/comments")
    private ResponseEntity<Comment> updateComment(@RequestBody Comment comment){
        Comment result = commentRepository.save(comment);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/comments/{id}")
    private ResponseEntity<?> deleteComment(@PathVariable Long id){
        commentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
