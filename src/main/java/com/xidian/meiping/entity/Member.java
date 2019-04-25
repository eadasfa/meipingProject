package com.xidian.meiping.entity;


public class Member {
    private Integer id;

    private String name;

    private String agenda;

    private String birthday;

    private String teleNumber;

    private String registerDate;

    private String status;

    private Integer memberCardBuyId;

    private Double balance;

    private Integer credit;

    private Double totalConsumption;

    private String startDate;

    private String endDate;

    private String cardTypeName;

    private Integer youxiaoCishu;

    private Integer youxiaoTianshu;

    public Integer getOperaterId() {
        return operaterId;
    }

    public void setOperaterId(Integer operaterId) {
        this.operaterId = operaterId;
    }

    private Integer operaterId;
    private String trainerName;

    private Integer wardrobeId;
    private Double account;

    public Double getAccount() {
        return account;
    }

    public void setAccount(Double account) {
        this.account = account;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public Integer getWardrobeId() {
        return wardrobeId;
    }

    public void setWardrobeId(Integer wardrobeId) {
        this.wardrobeId = wardrobeId;
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

    public String getAgenda() {
        return agenda;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda == null ? null : agenda.trim();
    }

    public String getBirthday() {
        return birthday==null?null:birthday.split("\\s+")[0];
    }

    public void setBirthday(String birthday) {
        if(birthday!=null&&birthday.equals("null")) birthday=null;
        this.birthday = birthday;
    }

    public String getTeleNumber() {
        return teleNumber;
    }

    public void setTeleNumber(String teleNumber) {
        this.teleNumber = teleNumber == null ? null : teleNumber.trim();
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMemberCardBuyId() {
        return memberCardBuyId;
    }

    public void setMemberCardBuyId(Integer memberCardBuyId) {
        this.memberCardBuyId = memberCardBuyId;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Double getTotalConsumption() {
        return totalConsumption;
    }

    public void setTotalConsumption(Double totalConsumption) {
        this.totalConsumption = totalConsumption;
    }

    public String getStartDate() {
        return startDate==null?null:startDate.split("\\s+")[0];
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate==null?null:endDate.split("\\s+")[0];
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getCardTypeName() {
        return cardTypeName;
    }

    public void setCardTypeName(String cardTypeName) {
        this.cardTypeName = cardTypeName == null ? null : cardTypeName.trim();
    }

    public Integer getYouxiaoCishu() {
        return youxiaoCishu;
    }

    public void setYouxiaoCishu(Integer youxiaoCishu) {
        this.youxiaoCishu = youxiaoCishu;
    }

    public Integer getYouxiaoTianshu() {
        return youxiaoTianshu;
    }

    public void setYouxiaoTianshu(Integer youxiaoTianshu) {
        this.youxiaoTianshu = youxiaoTianshu;
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", agenda='" + agenda + '\'' +
                ", birthday='" + birthday + '\'' +
                ", teleNumber='" + teleNumber + '\'' +
                ", registerDate='" + registerDate + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", cardTypeName='" + cardTypeName + '\'' +
                ", youxiaoCishu=" + youxiaoCishu +
                ", youxiaoTianshu=" + youxiaoTianshu +
                '}';
    }
}