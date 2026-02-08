package com.rohan.springEcom.controller;


import com.rohan.springEcom.model.Product;
import com.rohan.springEcom.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class ProductController {


    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProduct(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("product/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable("productId") Integer productId){
        Product product  = productService.getProductById(productId);
        if(product.getId()!=-1){
            return new ResponseEntity<>(product,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("product/{productId}/image")
    public ResponseEntity<byte[] > getImage(@PathVariable("productId") int productId){
        Product product = productService.getProductById(productId);
        byte[] imageData = product.getImageData();
        return new ResponseEntity<>(imageData,HttpStatus.OK);
    }
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile){
        Product savedProduct =  null;
        try {
            savedProduct = productService.addOrUpdate(product,imageFile);
            return new ResponseEntity<>(savedProduct,HttpStatus.CREATED);
        }catch (IOException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("product/{productId}")
    public ResponseEntity<?> updateProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile){
        Product updatedProduct = null;
        try{
            updatedProduct = productService.addOrUpdate(product,imageFile);
            return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>("product deleted successfully",HttpStatus.OK);
    }

    @GetMapping("products/search")
    public ResponseEntity<List<Product>> searchByKeyword(@RequestParam String keyword){
        return new ResponseEntity<>(productService.searchByKeyword(keyword),HttpStatus.OK);
    }

}
