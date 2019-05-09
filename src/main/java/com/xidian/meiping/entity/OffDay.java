package com.xidian.meiping.entity;

import com.xidian.meiping.util.ConstValue;

import java.text.ParsePosition;
import java.util.Date;

public class OffDay {

    private boolean isModified = false;
    private Integer id;

    private String startTime;

    private String endTime;

    private String operateTime;

    private Integer memberId;

    private String context;

    public String getContext() {
        modify();
        return context;
    }
    public String memberName;

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(String operateTime) {
        this.operateTime = operateTime;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public void modify(){
        if(isModified||context!=null) return;
        Date endTime = ConstValue.df.parse(this.endTime,new ParsePosition(0));
        Date now = ConstValue.df.parse(ConstValue.df.format(new Date()),new ParsePosition(0));
        if(!now.after(endTime)) {
            this.context = "请假中";
        }
        else this.context = "已过期";
        isModified = true;
    }

    @Override
    public String toString() {
        return "OffDay{" +
                "isModified=" + isModified +
                ", id=" + id +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", operateTime='" + operateTime + '\'' +
                ", memberId=" + memberId +
                ", context='" + getContext() + '\'' +
                ", memberName='" + memberName + '\'' +
                '}';
    }
}