package com.ceramicthree.forum.service;

import com.ceramicthree.forum.dto.AuthenticationResponse;
import com.ceramicthree.forum.dto.LoginReqest;
import com.ceramicthree.forum.dto.RegisterRequest;
import com.ceramicthree.forum.exception.CustomEx;
import com.ceramicthree.forum.model.NotificationEmail;
import com.ceramicthree.forum.model.User;
import com.ceramicthree.forum.model.VerificationToken;
import com.ceramicthree.forum.repository.UserRepository;
import com.ceramicthree.forum.repository.VerificationTokenRepository;
import com.ceramicthree.forum.security.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, VerificationTokenRepository verificationTokenRepository, MailService mailService, AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.verificationTokenRepository = verificationTokenRepository;
        this.mailService = mailService;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @Transactional
    public void signUp(RegisterRequest registerRequest){
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setLogin(registerRequest.getLogin());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setIsActivated(false);
        userRepository.save(user);

        String token = generateVerificationToken(user);

        mailService.sendMail(new NotificationEmail("Activate your account", user.getEmail(),
                "Thank you for signing up! \nPlease click here to activate your account: http://localhost:8081/api/auth/verifyToken/" + token ));
    }

    public AuthenticationResponse login(LoginReqest loginReqest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqest.getLogin(), loginReqest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        return new AuthenticationResponse(token, loginReqest.getLogin());
    }

    public String generateVerificationToken(User user){
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);
        return token;
    }

    public void verifyToken(String token){
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token).orElseThrow(() -> new CustomEx("Token not found"));
        fetchUserAndEnable(verificationToken);
    }

    private void fetchUserAndEnable(VerificationToken verificationToken) {
        User user = userRepository.findByLogin(verificationToken.getUser().getLogin()).orElseThrow(() -> new CustomEx("User not found"));
        user.setIsActivated(true);
        userRepository.save(user);
    }

}
