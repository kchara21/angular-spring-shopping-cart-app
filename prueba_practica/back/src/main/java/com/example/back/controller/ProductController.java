package com.example.back.controller;


import com.example.back.dto.MessageResponse;
import com.example.back.dto.Product.ProductDTO;
import com.example.back.dto.Product.ProductResponse;
import com.example.back.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping("/products")
    public ResponseEntity<ProductResponse> listAllProducts(){
        ProductResponse productResponse = productService.listAllProducts();
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }


    @PostMapping("/default/products")
    public ProductResponse upLoadProductsApi(){
        return productService.uploadProductsApi();
    }


    @PostMapping("/products")
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO){
        return new ResponseEntity<>(productService.createProduct(productDTO), HttpStatus.CREATED);
    }

    @PutMapping("{idProduct}/products")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable(name = "idProduct") long idProduct){
        ProductDTO productResponse = productService.updateProduct(productDTO,idProduct);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @DeleteMapping("{idProduct}/products")
    public ResponseEntity<MessageResponse> deleteProduct(@PathVariable(name = "idProduct") long idProduct){
        MessageResponse productResponse = productService.deleteProduct(idProduct);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

}
