package com.server.back.domain.user.service;


import com.server.back.domain.user.dto.BadgeResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;

import java.util.List;

public interface UserService {
    void join(UserRequestDto requestDto);
    boolean userNicknameCheck(UserRequestDto requestDto);
    boolean userUsernameCheck(UserRequestDto requestDto);
    UserResponseDto userInfo(Long userId);
    void userUpdate(Long userId, UserRequestDto requestDto);
    List<BadgeResponseDto> userBadge(Long userId);
}
