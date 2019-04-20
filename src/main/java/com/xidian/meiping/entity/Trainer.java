package com.xidian.meiping.entity;

public class Trainer {
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
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
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

    public Integer getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }
    public Integer getTrainerId() {
        return trainerId;
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
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRendTrainerLogId() {
        return rendTrainerLogId;
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
}