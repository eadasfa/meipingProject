package com.xidian.meiping.entity;

import javax.servlet.http.HttpServletRequest;

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

    public static Card newInstance(HttpServletRequest request){
        Card card = new Card();
        card.setId(Integer.parseInt(request.getParameter("id")));
        card.setName(request.getParameter("name"));
        card.setYouxiaoCishu(Integer.parseInt(request.getParameter("youxiaoCishu")));
        card.setYouxiaoTianshu(Integer.parseInt(request.getParameter("youxiaoTianshu")));
        card.setPrice(Double.parseDouble(request.getParameter("price")));
        return card;
    }
}