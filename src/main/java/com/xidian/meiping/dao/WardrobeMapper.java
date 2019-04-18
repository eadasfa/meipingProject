package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Wardrobe;

import java.util.List;

public interface WardrobeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Wardrobe record);

    int insertSelective(Wardrobe record);

    Wardrobe selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Wardrobe record);

    int updateByPrimaryKey(Wardrobe record);

    List<Wardrobe> selectByName(String name);

    List<Wardrobe> selectByStatus(int status);

    List<Wardrobe> selectAll();

    Wardrobe selectByMemberId(Integer memberId);
}