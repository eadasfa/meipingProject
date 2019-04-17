package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Operater;

import java.util.List;

public interface OperaterMapper {
    int deleteByPrimaryKey(Integer operaterId);

    int insert(Operater record);

    int insertSelective(Operater record);

    Operater selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Operater record);

    int updateByPrimaryKey(Operater record);

    Operater selectByPrimaryKeyIncludePw(Integer id);

    List<Operater> selectAll();
}