package com.example.back.controller;


import com.example.back.dto.Sale.SaleDTO;
import com.example.back.dto.Sale.SaleResponse;
import com.example.back.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping("")
    public ResponseEntity<SaleResponse> listAllSales(){
        SaleResponse saleResponse = saleService.listAllSales();
        return new ResponseEntity<>(saleResponse, HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity<SaleDTO> createSale(@RequestBody SaleDTO saleDTO){
        SaleDTO saleResponse = saleService.makeSale(saleDTO);
        return new ResponseEntity<>(saleResponse, HttpStatus.CREATED);
    }

}
