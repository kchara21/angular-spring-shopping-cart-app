package com.example.back.dto.Product;

import com.example.back.dto.Product.ProductDTO;

import java.util.List;

public class ProductResponse {
    private List<ProductDTO> content;

    public List<ProductDTO> getContent() {
        return content;
    }

    public void setContent(List<ProductDTO> content) {
        this.content = content;
    }

    public ProductResponse() {
        super();
    }
}
