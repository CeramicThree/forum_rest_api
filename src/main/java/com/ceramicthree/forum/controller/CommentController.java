package com.ceramicthree.forum.controller;

import com.ceramicthree.forum.model.Comment;
import com.ceramicthree.forum.repository.CommentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class CommentController {
    private final CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping("/comments")
    public Collection<Comment> getComments(){
        return (Collection<Comment>) commentRepository.findAll();
    }
}
