package com.xidian.meiping.entity;

import javax.servlet.http.HttpServletRequest;

public class Wardrobe {
    private Integer id;

    private String name;

    private Integer status;

    private Integer rendWardrobeLogId;

    private Integer memberId;

    private Double price;

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRendWardrobeLogId() {
        return rendWardrobeLogId;
    }

    public void setRendWardrobeLogId(Integer rendWardrobeLogId) {
        this.rendWardrobeLogId = rendWardrobeLogId;
    }

    public static Wardrobe newInstance(HttpServletRequest request){
        Wardrobe wardrobe = new Wardrobe();
        wardrobe.setId(Integer.parseInt(request.getParameter("id")));
        String name = request.getParameter("name");
        if(name ==null) name = "";
        wardrobe.setName(request.getParameter("name"));
        wardrobe.setStatus(Integer.parseInt(request.getParameter("status")));
        return wardrobe;
    }

    @Override
    public String toString() {
        return "Wardrobe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", rendWardrobeLogId=" + rendWardrobeLogId +
                ", memberId=" + memberId +
                ", price=" + price +
                '}';
    }
}