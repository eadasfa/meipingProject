package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Operater;

public interface OperaterMapper {
    int deleteByPrimaryKey(Integer operaterId);

    int insert(Operater record);

    int insertSelective(Operater record);

    Operater selectByPrimaryKey(Integer operaterId);

    int updateByPrimaryKeySelective(Operater record);

    int updateByPrimaryKey(Operater record);
}