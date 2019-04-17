package com.xidian.meiping.entity;

import javax.servlet.http.HttpServletRequest;

public class Operater {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private Integer id;

    private String name;

    private String password;

    private Integer permission;

    private String position;

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Integer getPermission() {
        return permission;
    }

    public void setPermission(Integer permission) {
        this.permission = permission;
    }
    public static Operater newInstance(HttpServletRequest request){
        Operater e = new Operater();
        String temp = request.getParameter("id");
        if (temp!=null) e.setId(Integer.parseInt(temp));
        temp = request.getParameter("name");
        if (temp!=null) e.setName(temp);
        temp = request.getParameter("password");
        if (temp!=null) e.setPassword(temp);
        temp = request.getParameter("permission");
        if (temp!=null) e.setPermission(Integer.parseInt(temp));
        return e;
    }
}