package com.ohgiraffers.myproject.posts.repository;

import com.ohgiraffers.myproject.posts.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository extends JpaRepository<Post, Long> {
}