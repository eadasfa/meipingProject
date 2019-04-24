package com.xidian.meiping.entity;

import java.util.Date;

public class RendWardrobeLog {
    private Integer id;
    private Integer wardrobeId;

    private Integer memberId;
    private String memberName;
    private Integer operaterId;
    private String operaterName;
    private String startTime;
    private String operateTime;
    private String endTime;
    private Double totalAmount;
    private String context;

    public String getContext() {
        return context;
    }

    public String getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(String operateTime) {
        this.operateTime = operateTime;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
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

    public Integer getWardrobeId() {
        return wardrobeId;
    }

    public void setWardrobeId(Integer wardrobeId) {
        this.wardrobeId = wardrobeId;
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

    @Override
    public String toString() {
        return "RendWardrobeLog{" +
                "id=" + id +
                ", wardrobeId=" + wardrobeId +
                ", memberId=" + memberId +
                ", memberName='" + memberName + '\'' +
                ", operaterId=" + operaterId +
                ", operaterName='" + operaterName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", operateTime='" + operateTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", totalAmount=" + totalAmount +
                ", context='" + context + '\'' +
                '}';
    }
}