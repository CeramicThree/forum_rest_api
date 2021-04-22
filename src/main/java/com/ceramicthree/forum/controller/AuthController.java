package com.ceramicthree.forum.controller;

import com.ceramicthree.forum.dto.AuthenticationResponse;
import com.ceramicthree.forum.dto.LoginReqest;
import com.ceramicthree.forum.dto.RegisterRequest;
import com.ceramicthree.forum.repository.UserRepository;
import com.ceramicthree.forum.repository.VerificationTokenRepository;
import com.ceramicthree.forum.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService, VerificationTokenRepository verificationTokenRepository, UserRepository userRepository) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody RegisterRequest registerRequest) {
        authService.signUp(registerRequest);
        return new ResponseEntity<>("Registration successful!", HttpStatus.OK);
    }

    @PostMapping("/signin")
    public AuthenticationResponse signIn(@RequestBody LoginReqest loginReqest) {
        return authService.login(loginReqest);
    }


    @GetMapping("/verifyToken/{token}")
    public ResponseEntity<String> verifyToken(@PathVariable String token) {
        authService.verifyToken(token);
        return new ResponseEntity<>("Verification passed", HttpStatus.OK);
    }
}
