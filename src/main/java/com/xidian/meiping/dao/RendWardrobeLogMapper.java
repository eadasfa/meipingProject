package com.xidian.meiping.dao;

import com.xidian.meiping.entity.RendWardrobeLog;

public interface RendWardrobeLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RendWardrobeLog record);

    int insertSelective(RendWardrobeLog record);

    RendWardrobeLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RendWardrobeLog record);

    int updateByPrimaryKey(RendWardrobeLog record);
}