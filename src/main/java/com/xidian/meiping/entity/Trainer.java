package com.xidian.meiping.entity;

import com.xidian.meiping.dao.TrainerMapper;
import com.xidian.meiping.util.ConstValue;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParsePosition;
import java.util.Date;

public class Trainer {

    public boolean insertOrUpdate = false;
    private boolean isModified=false;
    private Integer trainerId;
    private String trainerName;
    private Integer price;

    private Integer status;

    private Integer rendTrainerLogId;

    private Integer memberId;

    private String memberName;
    private String startTime;
    private String endTime;
    private Integer dayNumber;

    public String getTrainerName() {
        modifyStatus();
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getMemberName() {
        modifyStatus();return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getStartTime() {
        modifyStatus();return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        modifyStatus();return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getDayNumber() {
        modifyStatus();
        return dayNumber;
    }

    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
    }

    public Integer getMemberId() {
        modifyStatus();return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }
    public Integer getTrainerId() {
        modifyStatus();return trainerId;
    }

    public void setTrainerId(Integer trainerId) {
        this.trainerId = trainerId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getStatus() {
        modifyStatus();return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRendTrainerLogId() {
        modifyStatus();return rendTrainerLogId;
    }

    public void setRendTrainerLogId(Integer rendTrainerLogId) {
        this.rendTrainerLogId = rendTrainerLogId;
    }

    @Override
    public String toString() {
        return "Trainer{" +
                "trainerId=" + trainerId +
                ", trainerName='" + trainerName + '\'' +
                ", price=" + price +
                ", status=" + status +
                ", rendTrainerLogId=" + rendTrainerLogId +
                ", memberId=" + memberId +
                ", memberName='" + memberName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", dayNumber=" + dayNumber +
                '}';
    }
    private void modifyStatus(){
        if(insertOrUpdate||isModified||status==0||status==2||endTime==null) return;
        Date endTime = ConstValue.df.parse(this.endTime,new ParsePosition(0));
        Date now = ConstValue.df.parse(ConstValue.df.format(new Date()),new ParsePosition(0));
        if(!now.after(endTime)) return;
//        this.memberId=null;
        this.status = 0;
//        this.memberName=null;
        this.endTime=null;
        this.dayNumber=null;
        this.rendTrainerLogId=null;
        isModified = true;
    }
}