package com.xidian.meiping.dao;

import com.xidian.meiping.entity.RendTrainerLog;
import com.xidian.meiping.entity.RendWardrobeLog;

import java.util.List;

public interface RendWardrobeLogMapper {

    int deleteByMemberId(Integer memberId);
    
    int deleteByPrimaryKey(Integer id);

    int insert(RendWardrobeLog record);

    int insertSelective(RendWardrobeLog record);

    RendWardrobeLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RendWardrobeLog record);

    int updateByPrimaryKey(RendWardrobeLog record);

    RendWardrobeLog selectByMemberIdAndWardrobeIdAndEndTime(Integer memberId,Integer wardrobeId,String endTime);

    List<RendWardrobeLog> selectAll();
    List<RendWardrobeLog> searchByTheseKey(String from,String to,Integer memberId,Integer operaterId);
    int deleteByWardrobeId(Integer wardrobeId);
}