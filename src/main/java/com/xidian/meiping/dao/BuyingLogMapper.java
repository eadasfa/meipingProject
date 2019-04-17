package com.xidian.meiping.dao;

import com.xidian.meiping.entity.BuyingLog;

import java.util.List;

public interface BuyingLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BuyingLog record);

    int insertSelective(BuyingLog record);

    BuyingLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BuyingLog record);

    int updateByPrimaryKey(BuyingLog record);

    List<BuyingLog> selectAll();

    List<BuyingLog> searchByDate(String date1,String date2,Integer memberId, Integer goodId,Integer operaterId);
}