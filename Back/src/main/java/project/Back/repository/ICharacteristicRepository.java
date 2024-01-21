package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.Back.entity.Characteristic;

@Repository
public interface ICharacteristicRepository extends JpaRepository<Characteristic, Long> {

}
