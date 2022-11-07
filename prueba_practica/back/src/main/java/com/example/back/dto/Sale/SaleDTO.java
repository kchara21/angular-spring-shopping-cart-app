package com.example.back.dto.Sale;

import java.util.Date;

public class SaleDTO {
    private long id;
    private String orderNumber;
    private Date date = new Date();
    private String client;


    public SaleDTO() {
        super();
    }

    public SaleDTO(long id, String orderNumber, Date date, String client) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.date = date;
        this.client = client;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }
}
