package com.xidian.meiping.dao;


import com.xidian.meiping.entity.TopUpLog;

public interface TopUpLogMapper {
    int deleteByPrimaryKey(Integer id);
    int deleteByMemberId(Integer memberId);
    int insert(TopUpLog record);

    int insertSelective(TopUpLog record);

    TopUpLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TopUpLog record);

    int updateByPrimaryKey(TopUpLog record);
}