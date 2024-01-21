package project.Back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import project.Back.exception.BadRequestException;
import project.Back.service.AWSS3Service;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/product/images")
public class ImagesController {

    @Autowired
    private AWSS3Service awss3Service;

    //-POST to create a new image
    @PostMapping(value = "/upload/{gameId}")
    public ResponseEntity<String> uploadFile(@PathVariable Long gameId, @RequestPart(value="file") MultipartFile file) throws BadRequestException{
        awss3Service.uploadFile(gameId, file);
        String response = "El archivo "+file.getOriginalFilename()+" fue cargado correctamente a S3";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //-DELETE to delete a image by file name (deleteImage)
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteImage(@PathVariable String fileName) {
        awss3Service.deleteFile(fileName);
        return ResponseEntity.ok("Imagen eliminada correctamente");
    }

    //-DELETE to delete a image by image id (deleteImageById)
    @DeleteMapping("/deleteById/{imageId}")
    public ResponseEntity<String> deleteImageById(@PathVariable Long imageId) throws BadRequestException{
        awss3Service.deleteImageById(imageId);
        return ResponseEntity.ok("Imagen eliminada correctamente");
    }

    //-GET to get all product images
    @GetMapping("/{gameId}/all")
    public ResponseEntity<List<String>> getAllProductImages(@PathVariable Long gameId) throws BadRequestException{
        List<String> images = awss3Service.getImagesByProductId(gameId);
        return ResponseEntity.ok(images);
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
