package com.ohgiraffers.myproject.posts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ohgiraffers.myproject.posts.entity.Post;
import com.ohgiraffers.myproject.posts.service.PostService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {


    @Autowired
    private PostService postService;

    // 모든 게시글 조회
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // 새로운 게시글 생성
    @PostMapping("/create")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // 특정 ID의 게시글 조회
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        return post.orElse(null);
    }

    // 특정 ID의 게시글 삭제
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
