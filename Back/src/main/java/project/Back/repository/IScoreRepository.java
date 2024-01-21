package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.Back.entity.Score;

import java.util.List;

@Repository
public interface IScoreRepository extends JpaRepository<Score, Long> {

    //Method to find product all scores
    @Query("select s from Score s where s.game.game_id = ?1 order by s.game.game_id")
    List<Score> findProductScores(Long ID);

    //Method to find product avg score
    @Query("select avg(s.stars) as stars from Score s where s.game.game_id = ?1")
    Double findProductAvgScore(Long ID);
}
