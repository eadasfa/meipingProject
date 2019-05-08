package com.xidian.meiping.entity;

import com.xidian.meiping.util.ConstValue;

import javax.servlet.http.HttpServletRequest;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Wardrobe {

    private boolean isModified = false;

    public boolean insertOrUpdate = false;
    private Integer id;

    private String name;

    private Integer status;

    private Integer rendWardrobeLogId;

    private Integer memberId;

    private Double price;

    private String memberName;

    private String endTime;
    private String startTime;

    public static void main(String []args){
        String beginTime=new String("2017-06-09");String endTime=new String("2017-05-08 11:22:22");
//        直接用Date自带方法before()和after()比较
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date sd1=df.parse(beginTime,new ParsePosition(0));
        Date sd2=df.parse(endTime,new ParsePosition(0));
        System.out.println(new Date());
        System.out.println(sd1.before(sd2));
        System.out.println(sd1.after(sd2));
    }
    public String getEndTime() {
        modifyStatus();
        return endTime;
    }
    public String getStartTime() {
        modifyStatus();
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getMemberName() {
        modifyStatus();
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }


    public void setEndTime(String endTime) {
        this.endTime = endTime.split("\\s+")[0];
    }

    public Double getPrice() {
        modifyStatus();return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getMemberId() {
        modifyStatus();return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        modifyStatus();return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getStatus() {
        modifyStatus();return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRendWardrobeLogId() {
        modifyStatus();return rendWardrobeLogId;
    }

    public void setRendWardrobeLogId(Integer rendWardrobeLogId) {
        this.rendWardrobeLogId = rendWardrobeLogId;
    }

    public static Wardrobe newInstance(HttpServletRequest request){
        Wardrobe wardrobe = new Wardrobe();
        wardrobe.setId(Integer.parseInt(request.getParameter("id")));
        String name = request.getParameter("name");
        if(name ==null) name = "";
        wardrobe.setName(request.getParameter("name"));
        wardrobe.setStatus(Integer.parseInt(request.getParameter("status")));
        return wardrobe;
    }

    @Override
    public String toString() {
        return "Wardrobe{" +
                "isModified=" + isModified +
                ", insertOrUpdate=" + insertOrUpdate +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", rendWardrobeLogId=" + rendWardrobeLogId +
                ", memberId=" + memberId +
                ", price=" + price +
                ", memberName='" + memberName + '\'' +
                ", endTime='" + endTime + '\'' +
                ", startTime='" + startTime + '\'' +
                '}';
    }

    private void modifyStatus(){
        if(insertOrUpdate||isModified||status==0||status==2||endTime==null) return;
        Date endTime = ConstValue.df.parse(this.endTime,new ParsePosition(0));
        Date now = ConstValue.df.parse(ConstValue.df.format(new Date()),new ParsePosition(0));
        if(!now.after(endTime)) return;
        this.status = 0;
        this.memberId = null;
        this.memberName=null;
        this.endTime=null;
        isModified = true;
    }
}