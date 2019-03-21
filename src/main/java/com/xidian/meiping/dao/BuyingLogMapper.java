package com.xidian.meiping.dao;

import com.xidian.meiping.entity.BuyingLog;

public interface BuyingLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BuyingLog record);

    int insertSelective(BuyingLog record);

    BuyingLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BuyingLog record);

    int updateByPrimaryKey(BuyingLog record);
}