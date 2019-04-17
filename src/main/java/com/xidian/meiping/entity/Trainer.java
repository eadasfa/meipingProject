package com.xidian.meiping.entity;

public class Trainer {
    private Integer trainerId;

    private Integer price;

    private Integer status;

    private Integer rendTrainerLogId;

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
}