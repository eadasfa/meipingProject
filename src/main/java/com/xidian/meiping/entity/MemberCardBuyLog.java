package com.xidian.meiping.entity;

import java.util.Date;

public class MemberCardBuyLog {
    private Integer id;

    private Integer memberId;

    private Integer cardId;

    private Double price;

    private Double account;

    private String startTime;

    private String endTime;

    private Integer operaterId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getAccount() {
        return account;
    }

    public void setAccount(Double account) {
        this.account = account;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
    }
}