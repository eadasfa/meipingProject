package com.xidian.meiping.dao;

import com.xidian.meiping.entity.BuyTrainer;

public interface BuyTrainerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BuyTrainer record);

    int insertSelective(BuyTrainer record);

    BuyTrainer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BuyTrainer record);

    int updateByPrimaryKey(BuyTrainer record);
}