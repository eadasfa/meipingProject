package com.xidian.meiping.dao;

import com.xidian.meiping.entity.MemberBuying;

public interface MemberBuyingMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(MemberBuying record);

    int insertSelective(MemberBuying record);

    MemberBuying selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberBuying record);

    int updateByPrimaryKey(MemberBuying record);
}