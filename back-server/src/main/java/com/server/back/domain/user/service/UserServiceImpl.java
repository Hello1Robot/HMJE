package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void join(UserRequestDto requestDto) {
        System.out.println(requestDto);
        User user = User.builder()
                .username(requestDto.getUsername())
                .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .phoneNumber(requestDto.getPhoneNumber())
                .level(0)
                .exp(0)
                .semo(0)
                .totalTime(0)
                .totalRight(0)
                .totalWorng(0)
                .isAdmin(requestDto.getIsAdmin())
                .isSecession(requestDto.getIsSecession())
                .build();

        userRepository.save(user);
    }

    @Override
    public boolean userNicknameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-nickname///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getNickname().equals(requestDto.getNickname())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }
    @Override
    public boolean userUsernameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-username///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getUsername().equals(requestDto.getUsername())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }
    @Override
    public boolean userPhonenumberCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-phonenumber///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getPhoneNumber().equals(requestDto.getPhoneNumber())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }
}