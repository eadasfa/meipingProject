package com.xidian.meiping.dao;

import com.xidian.meiping.entity.RendTrainerLog;

import java.util.List;

public interface RendTrainerLogMapper {

    int deleteByMemberId(Integer memberId);
    
    int deleteByPrimaryKey(Integer id);

    int insert(RendTrainerLog record);

    int insertSelective(RendTrainerLog record);

    RendTrainerLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RendTrainerLog record);

    int updateByPrimaryKey(RendTrainerLog record);

    List<RendTrainerLog> selectByMemberId(Integer memberId);

    RendTrainerLog selectByStartTimeAndMemberId(String startTime,Integer memberId);
}