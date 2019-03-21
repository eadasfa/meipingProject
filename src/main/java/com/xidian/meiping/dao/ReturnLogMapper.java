package com.xidian.meiping.dao;

import com.xidian.meiping.entity.ReturnLog;

public interface ReturnLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ReturnLog record);

    int insertSelective(ReturnLog record);

    ReturnLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ReturnLog record);

    int updateByPrimaryKey(ReturnLog record);
}