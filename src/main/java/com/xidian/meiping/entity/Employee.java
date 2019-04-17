package com.xidian.meiping.entity;

import javax.servlet.http.HttpServletRequest;

public class Employee {
    private Integer id;

    private String name;

    private String teleNumber;

    private String position;

    private Integer status;

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

    public String getTeleNumber() {
        return teleNumber;
    }

    public void setTeleNumber(String teleNumber) {
        this.teleNumber = teleNumber == null ? null : teleNumber.trim();
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position == null ? null : position.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    public static Employee newInstance(HttpServletRequest request){
        Employee e = new Employee();
        String temp = request.getParameter("id");
        if (temp!=null) e.setId(Integer.parseInt(temp));
        temp = request.getParameter("name");
        if (temp!=null) e.setName(temp);
        temp = request.getParameter("teleNumber");
        if (temp!=null) e.setTeleNumber(temp);
        temp = request.getParameter("position");
        if (temp!=null) e.setPosition(temp);
        e.setStatus(0);
        return e;
    }
}