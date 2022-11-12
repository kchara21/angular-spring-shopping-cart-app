package com.example.back.service;

import com.example.back.dto.MessageResponse;
import com.example.back.dto.Product.ProductDTO;
import com.example.back.dto.Product.ProductResponse;

public interface ProductService {


    public ProductResponse listAllProducts();

    public ProductResponse uploadProductsApi();

    public ProductDTO createProduct(ProductDTO productDTO);

    public ProductDTO updateProduct(ProductDTO productDTO, long idProduct);

    public MessageResponse deleteProduct(long productId);
}
