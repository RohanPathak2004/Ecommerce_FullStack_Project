package com.rohan.springEcom.service;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.rohan.springEcom.model.Product;
import com.rohan.springEcom.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {


    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(Integer productId) {
//        Product obj  = productRepo.findById(productId).orElse(new Product()); //works but not recommended

        return productRepo.findById(productId).orElse(new Product(-1));
    }

    public Product addOrUpdate(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return productRepo.save(product);
    }
    public void deleteProduct(int id){
        productRepo.deleteById(id);

    }

    public List<Product> searchByKeyword(String keyword) {
        return productRepo.searchByKeyword(keyword);
    }
}
