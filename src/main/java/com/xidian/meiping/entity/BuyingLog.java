package com.xidian.meiping.entity;

import java.util.Date;

public class BuyingLog {

    private Integer id;

    private Integer goodId;

    private String goodName;

    private Double buyingPrice;

    private Integer number;

    private String buyingTime;

    private Integer operaterId;

    private String operaterName;

    private Double totalAmount;

    public String getOperaterName() {
        return operaterName;
    }

    public void setOperaterName(String operaterName) {
        this.operaterName = operaterName;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public Double getBuyingPrice() {
        return buyingPrice;
    }

    public void setBuyingPrice(Double buyingPrice) {
        this.buyingPrice = buyingPrice;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getBuyingTime() {
        return buyingTime.split("\\s+")[0];
    }

    public void setBuyingTime(String buyingTime) {
        this.buyingTime = buyingTime;
    }

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
    }
    public static void main(String[] args){

        Date date = new Date();
        System.out.println(date.toString());
    }

    @Override
    public String toString() {
        return "BuyingLog{" +
                "buyingTime='" + buyingTime + '\'' +
                '}';
    }
}