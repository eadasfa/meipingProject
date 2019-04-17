package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Good;

import java.util.List;

public interface GoodMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Good record);

    int insertSelective(Good record);

    Good selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Good record);

    int updateByPrimaryKey(Good record);

    List<Good> selectAll();

    List<Good> selectByName(String name);
}