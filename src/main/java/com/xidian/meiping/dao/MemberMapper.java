package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Member;

import java.util.List;

public interface MemberMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Member record);

    int insertSelective(Member record);

    Member selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Member record);

    int updateByPrimaryKey(Member record);

    List<Member> selectAll();

    List<Member> selectByName(String name);
}