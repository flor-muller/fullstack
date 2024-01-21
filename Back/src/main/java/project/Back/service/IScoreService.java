package project.Back.service;

import project.Back.dto.ScoreDTO;
import project.Back.exception.BadRequestException;

import java.util.List;

public interface IScoreService {

    void createScore(Long gameId, ScoreDTO scoreDTO) throws BadRequestException;

    void updateScore(Long gameId, ScoreDTO scoreDTO) throws BadRequestException;

    void deleteScore(Long score_id);

    List<ScoreDTO> findProductScores(Long game_id);

    double findProductAvgScore(Long game_id);
}

