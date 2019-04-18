package com.xidian.meiping.dao;

import com.xidian.meiping.entity.RendTrainerLog;

public interface RendTrainerLogMapper {

    int deleteByMemberId(Integer memberId);
    
    int deleteByPrimaryKey(Integer id);

    int insert(RendTrainerLog record);

    int insertSelective(RendTrainerLog record);

    RendTrainerLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RendTrainerLog record);

    int updateByPrimaryKey(RendTrainerLog record);
}