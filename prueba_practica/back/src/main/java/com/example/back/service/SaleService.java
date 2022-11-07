package com.example.back.service;

import com.example.back.dto.Sale.SaleDTO;
import com.example.back.dto.Sale.SaleResponse;

public interface SaleService {

    public SaleDTO makeSale(SaleDTO saleDTO );

    public SaleResponse listAllSales();
}
