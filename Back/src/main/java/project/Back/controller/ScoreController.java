package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.Back.dto.ScoreDTO;
import project.Back.exception.BadRequestException;
import project.Back.service.IScoreService;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/product/scores")
public class ScoreController {

    @Autowired
    IScoreService scoreService;

    //-POST to create a new score
    @PostMapping("/createscore/{gameId}")
    public ResponseEntity<?> registerNewScore(@PathVariable Long gameId, @RequestBody ScoreDTO scoreDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        scoreService.createScore(gameId, scoreDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Puntuacion registrada con éxito.");
        return response;
    }

    //-PUT to update an existing score (updateScore)
    @PutMapping("/updatescore/{gameId}")
    public ResponseEntity<?> modifyProduct(@PathVariable Long gameId, @RequestBody ScoreDTO scoreDTO) throws BadRequestException {
        ResponseEntity<String> response = null;
        scoreService.updateScore(gameId, scoreDTO);
        response = ResponseEntity.status(HttpStatus.OK).body("Puntuacion actualizada con éxito.");
        return response;
    }

    //-DELETE to delete a score by ID (deleteScore)
    @DeleteMapping("/deletescore/{score_id}")
    public ResponseEntity<?> deleteScore(@PathVariable Long score_id) {
        ResponseEntity<String> response = null;
        scoreService.deleteScore(score_id);
        response = ResponseEntity.status(HttpStatus.OK).body("Puntuacion eliminada con éxito.");
        return response;
    }

    //-GET to search list of all product scores (findProductScores)
    @GetMapping("/{game_id}")
    public Collection<ScoreDTO> searchProductScores(@PathVariable Long game_id){
        return scoreService.findProductScores(game_id);
    }

    //-GET to search product's avg score (findProductAvgScore)
    @GetMapping("/avg/{game_id}")
    public double searchProductAVGScore(@PathVariable Long game_id){
        return scoreService.findProductAvgScore(game_id);
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
