package com.xidian.meiping.entity;
import java.util.Date;

public class TopUpLog {
    private Integer id;

    private Integer memberId;

    private Integer operaterId;

    private String time;

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    private Double money;
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

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "TopUpLog{" +
                "id=" + id +
                ", memberId=" + memberId +
                ", operaterId=" + operaterId +
                ", time='" + time + '\'' +
                ", money=" + money +
                '}';
    }
}