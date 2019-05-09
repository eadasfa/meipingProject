package com.xidian.meiping.dao;

import com.xidian.meiping.entity.OffDay;

import java.util.List;

public interface OffDayMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OffDay record);

    int insertSelective(OffDay record);

    OffDay selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OffDay record);

    int updateByPrimaryKey(OffDay record);

    List<OffDay> selectByDate(String from,String to,Integer memberId);
    List<OffDay> selectAll();
}