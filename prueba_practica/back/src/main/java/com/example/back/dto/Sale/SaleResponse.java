package com.example.back.dto.Sale;

import java.util.List;

public class SaleResponse {
    private List<SaleDTO> content;


    public SaleResponse() {
    }

    public SaleResponse(List<SaleDTO> content) {
        this.content = content;
    }

    public List<SaleDTO> getContent() {
        return content;
    }

    public void setContent(List<SaleDTO> content) {
        this.content = content;
    }
}
