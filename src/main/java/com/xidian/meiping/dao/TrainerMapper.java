package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Trainer;

public interface TrainerMapper {
    int deleteByPrimaryKey(Integer trainerId);

    int insert(Trainer record);

    int insertSelective(Trainer record);

    Trainer selectByPrimaryKey(Integer trainerId);

    int updateByPrimaryKeySelective(Trainer record);

    int updateByPrimaryKey(Trainer record);
}