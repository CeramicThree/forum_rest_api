package com.ceramicthree.forum.repository;

import com.ceramicthree.forum.model.Comment;
import com.ceramicthree.forum.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
