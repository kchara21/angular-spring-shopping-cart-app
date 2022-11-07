package com.example.back.service;

import com.example.back.dto.Sale.SaleDTO;
import com.example.back.dto.Sale.SaleResponse;
import com.example.back.entities.Sale;
import com.example.back.repository.SaleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleServiceImpl implements SaleService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SaleRepository saleRepository;


    @Override
    public SaleDTO makeSale(SaleDTO saleDTO) {
        String newOrder = String.valueOf(Math.floor(Math.random()*2000000+1));
        Sale sale = mappingEntity(saleDTO);
        sale.setOrderNumber(newOrder);

        Sale newSale = saleRepository.save(sale);
        return mappingDTO(newSale);
    }

    @Override
    public SaleResponse listAllSales() {
        List<SaleDTO> content  = saleRepository.findAll().stream().map(sale -> mappingDTO(sale)).collect(Collectors.toList());
        SaleResponse saleResponse = new SaleResponse();
        saleResponse.setContent(content);
        return saleResponse;
    }


    //Convierte de Entidad a DTO
    private SaleDTO mappingDTO(Sale sale){
        SaleDTO saleDTO = modelMapper.map(sale, SaleDTO.class);
        return saleDTO;
    }

    //Convierte de DTO a Entidad
    private Sale mappingEntity(SaleDTO saleDTO){
        Sale sale = modelMapper.map(saleDTO,Sale.class);
        return sale;
    }

}
