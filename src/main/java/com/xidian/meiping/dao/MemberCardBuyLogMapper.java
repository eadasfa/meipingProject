package com.xidian.meiping.dao;

import com.xidian.meiping.entity.MemberCardBuyLog;

public interface MemberCardBuyLogMapper {

    int deleteByPrimaryKey(Integer id);

    int deleteByMemberId(Integer memberId);

    int insert(MemberCardBuyLog record);

    int insertSelective(MemberCardBuyLog record);

    MemberCardBuyLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberCardBuyLog record);

    int updateByPrimaryKey(MemberCardBuyLog record);
}