package com.xidian.meiping.entity;

public class Operater {
    private Integer operaterId;

    private String password;

    private Integer permission;

    /*
     * status = 0,1,2,3
     * 其中0代表停用，123分别为3级权限
     */
    private Integer status;

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}