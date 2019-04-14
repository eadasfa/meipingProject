package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Operater;

import java.util.List;

public interface OperaterMapper {
    int deleteByPrimaryKey(Integer operaterId);

    int insert(Operater record);

    int insertSelective(Operater record);

    Operater selectByPrimaryKeyIncludePw(Integer operaterId);
    Operater selectByPrimaryKey(Integer operaterId);

    int updateByPrimaryKeySelective(Operater record);

    int updateByPrimaryKey(Operater record);

    List<Operater> selectAll();
}