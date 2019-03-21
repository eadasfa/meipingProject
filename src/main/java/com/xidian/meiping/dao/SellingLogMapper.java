package com.xidian.meiping.dao;

import com.xidian.meiping.entity.SellingLog;

public interface SellingLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SellingLog record);

    int insertSelective(SellingLog record);

    SellingLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SellingLog record);

    int updateByPrimaryKey(SellingLog record);
}