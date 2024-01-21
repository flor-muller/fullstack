package project.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.Back.entity.Images;

@Repository
public interface IImagesRepository  extends JpaRepository<Images, Long> {

    //Method to find image url
    @Query("select i from Images i where i.url = ?1")
    Images findImageUrl(String url);
}