package project.Back.service;

import org.springframework.web.multipart.MultipartFile;
import project.Back.exception.BadRequestException;

import java.util.List;

public interface AWSS3Service {

    void uploadFile(Long gameId, MultipartFile file) throws BadRequestException;

    List<String> getImagesByProductId(Long productId) throws BadRequestException;

    void deleteFile(String fileName);

    void deleteImageById(Long imageId) throws BadRequestException;
}
