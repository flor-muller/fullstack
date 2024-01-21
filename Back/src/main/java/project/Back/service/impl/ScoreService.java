package project.Back.service.impl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.Back.dto.ProductDTO;
import project.Back.dto.ScoreDTO;
import project.Back.entity.Product;
import project.Back.entity.Score;
import project.Back.repository.IProductRepository;
import project.Back.repository.IScoreRepository;
import project.Back.service.IScoreService;
import project.Back.exception.BadRequestException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScoreService implements IScoreService{

    @Autowired
    IScoreRepository scoreRepository;

    @Autowired
    IProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void createScore(Long gameId, ScoreDTO scoreDTO) throws BadRequestException {
        Optional<Product> game = productRepository.findById(gameId);
        if (game.isPresent() && !game.get().isInactive()) {
            Score score = mapper.convertValue(scoreDTO, Score.class);
            score.setGame(game.get());
            scoreRepository.save(score);
        } else {
            String messageError = "El juego solicitado no existe";
            throw new BadRequestException(messageError);
        }
    }

    @Override
    public void updateScore(Long gameId, ScoreDTO scoreDTO) throws BadRequestException {
        Optional<Product> game = productRepository.findById(gameId);
        if (game.isPresent() && !game.get().isInactive()) {
            if (scoreRepository.findById(scoreDTO.getScore_id()) != null) {
                Score score = mapper.convertValue(scoreDTO, Score.class);
                scoreRepository.save(score);
            } else {
                String messageError = "El score que se desea editar no existe";
                throw new BadRequestException(messageError);
            }
        } else {
            String messageError = "El juego solicitado no existe";
            throw new BadRequestException(messageError);
        }
    }

    @Override
    public void deleteScore(Long score_id) {
        scoreRepository.deleteById(score_id);
    }

    @Override
    public List<ScoreDTO> findProductScores(Long game_id) {
        List<Score> scores = scoreRepository.findProductScores(game_id);
        List<ScoreDTO> scoresDTO = new ArrayList<>();
        for (Score score : scores) {
            scoresDTO.add(mapper.convertValue(score, ScoreDTO.class));
        }
        return scoresDTO;
    }

    @Override
    public double findProductAvgScore(Long game_id) {
        Double avgScoreQuery = scoreRepository.findProductAvgScore(game_id);
        double avgScore = 0;
        if (avgScoreQuery == null) {
            return avgScore;
        } else {
            avgScore = avgScoreQuery.doubleValue();
            Product product = productRepository.findById(game_id).orElse(null);
            if (product != null) {
                product.setTotalScore(avgScore);
            }
            return avgScore;
        }
    }
}
