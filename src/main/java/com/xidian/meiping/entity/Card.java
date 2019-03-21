package com.xidian.meiping.entity;

public class Card {
    private Integer id;

    private String name;

    private Integer youxiaoCishu;

    private Integer youxiaoTianshu;

    private Double price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getYouxiaoCishu() {
        return youxiaoCishu;
    }

    public void setYouxiaoCishu(Integer youxiaoCishu) {
        this.youxiaoCishu = youxiaoCishu;
    }

    public Integer getYouxiaoTianshu() {
        return youxiaoTianshu;
    }

    public void setYouxiaoTianshu(Integer youxiaoTianshu) {
        this.youxiaoTianshu = youxiaoTianshu;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}