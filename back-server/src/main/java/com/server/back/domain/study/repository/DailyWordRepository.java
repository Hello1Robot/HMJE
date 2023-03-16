package com.server.back.domain.study.repository;


import com.server.back.domain.study.entity.DailyWord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface DailyWordRepository extends JpaRepository<DailyWord, Long> {
	List<DailyWord> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
