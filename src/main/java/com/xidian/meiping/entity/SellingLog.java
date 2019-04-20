package com.xidian.meiping.entity;

import java.util.Date;

public class SellingLog {
    private Integer id;

    private Integer goodId;
    private String goodName;
    private Integer credit;
    private Integer memberId;
    private String memberName;
    private Integer number;

    private Integer sellingType;

    private Double sellingPrice;

    private String sellingTime;

    private Double account;

    private Integer operaterId;
    private String operaterName;
    private Double totalAmount;

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public String getOperaterName() {
        return operaterName;
    }

    public void setOperaterName(String operaterName) {
        this.operaterName = operaterName;
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

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getSellingType() {
        return sellingType;
    }

    public void setSellingType(Integer sellingType) {
        this.sellingType = sellingType;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public String getSellingTime() {
        return sellingTime;
    }

    public void setSellingTime(String sellingTime) {
        this.sellingTime = sellingTime;
    }

    public Double getAccount() {
        return account;
    }

    public void setAccount(Double account) {
        this.account = account;
    }

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
    }
}