package project.Back.service.impl;

import com.amazonaws.HttpMethod;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.ResponseHeaderOverrides;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.Back.entity.Images;
import project.Back.entity.Product;
import project.Back.exception.BadRequestException;
import project.Back.repository.IImagesRepository;
import project.Back.repository.IProductRepository;
import project.Back.service.AWSS3Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AWSS3ServiceImpl implements AWSS3Service {
    private static final Logger LOGGER = LoggerFactory.getLogger(AWSS3ServiceImpl.class);

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    IImagesRepository imagesRepository;

    @Autowired
    IProductRepository gameRepository;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Override
    public void uploadFile(Long gameId, MultipartFile file) throws BadRequestException{
        File mainFile = new File(file.getOriginalFilename());
        try (FileOutputStream stream = new FileOutputStream(mainFile)) {
            stream.write(file.getBytes());
            String newFileName = System.currentTimeMillis() + "_" + mainFile.getName();
            LOGGER.info("Subiendo archivo con el nombre... " + newFileName);
            PutObjectRequest request = new PutObjectRequest(bucketName, newFileName, mainFile);
            amazonS3.putObject(request);
            // Obtener el objeto Game basado en el gameId
            Optional<Product> gameOptional = gameRepository.findById(gameId);
            if (gameOptional.isPresent()) {
                Product game = gameOptional.get();

                // Guardar la relación entre el game y la imagen en la base de datos
                Images image = new Images();
                image.setGame(game);
                image.setUrl(newFileName);
                imagesRepository.save(image);
            } else {
                String messageError = "No se ha podido cargar la imagen";
                throw new BadRequestException(messageError);
            }
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private String generatePresignedUrl(String bucketName, String key) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, key)
                        .withMethod(HttpMethod.GET);

        ResponseHeaderOverrides responseHeaders = new ResponseHeaderOverrides();
        responseHeaders.setContentType("image/jpeg");
        generatePresignedUrlRequest.setResponseHeaders(responseHeaders);

        // Set the region explicitly in the builder
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_2);
        AmazonS3 amazonS3 = builder.build();

        URL presignedUrl = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
        return presignedUrl.toString();
    }


    @Override
    public List<String> getImagesByProductId(Long productId) throws BadRequestException {
        Product product = gameRepository.findById(productId).orElseThrow(() -> new BadRequestException("Product not found with ID: " + productId));

        List<String> imageUrls = new ArrayList<>();
        List<Images> images = product.getImagesGames();

        for (Images image : images) {
            String imageUrl = generatePresignedUrl(bucketName, image.getUrl()); // URL válida por 1 hora
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }

    @Override
    public void deleteFile(String fileName) {
        amazonS3.deleteObject(bucketName, fileName);
        Images image = imagesRepository.findImageUrl(fileName);
        imagesRepository.delete(image);
    }

    @Override
    public void deleteImageById(Long imageId) throws BadRequestException {
        Optional<Images> imageOptional = imagesRepository.findById(imageId);
        if (imageOptional.isPresent()) {
            Images image = imageOptional.get();
            String fileName = image.getUrl();

            if (fileName != null) {
                amazonS3.deleteObject(bucketName, fileName);
                imagesRepository.delete(image);
            }
        } else {
            String messageError = "La imagen buscada para eliminar no existe";
            throw new BadRequestException(messageError);
        }
    }
}
