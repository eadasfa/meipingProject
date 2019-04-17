package com.xidian.meiping.dao;

import com.xidian.meiping.entity.BuyingLog;
import com.xidian.meiping.entity.SellingLog;

import java.util.List;

public interface SellingLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SellingLog record);

    int insertSelective(SellingLog record);

    SellingLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SellingLog record);

    int updateByPrimaryKey(SellingLog record);

    List<SellingLog> selectAll();

    List<SellingLog> searchByDate(String date1,String date2,
      Integer memberId,Integer goodId, Integer operaterId);
}