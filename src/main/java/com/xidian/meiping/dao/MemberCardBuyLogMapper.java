package com.xidian.meiping.dao;

import com.xidian.meiping.entity.MemberCardBuyLog;

import java.util.List;

public interface MemberCardBuyLogMapper {

    int deleteByPrimaryKey(Integer id);

    int deleteByMemberId(Integer memberId);

    int insert(MemberCardBuyLog record);

    int insertSelective(MemberCardBuyLog record);

    MemberCardBuyLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberCardBuyLog record);

    int updateByPrimaryKey(MemberCardBuyLog record);
    MemberCardBuyLog selectByMemberIdAndStartTime(Integer memberId,String startTime);
    List<MemberCardBuyLog> selectAll();
    List<MemberCardBuyLog> searchByDate(String date1, String date2,
                                        Integer memberId, Integer operaterId);
}