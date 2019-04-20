package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Trainer;

import java.util.List;

public interface TrainerMapper {
    int deleteByPrimaryKey(Integer trainerId);

    int insert(Trainer record);

    int insertSelective(Trainer record);

    Trainer selectByPrimaryKey(Integer trainerId);

    int updateByPrimaryKeySelective(Trainer record);

    int updateByPrimaryKey(Trainer record);

    Trainer selectByMemberId(Integer memberId);

    List<Trainer> selectAllWithMemberId();

    List<Trainer> searchByMemberIdAndTrainerId(Integer memberId, Integer trainerId);

    List<Trainer> selectAll();
}