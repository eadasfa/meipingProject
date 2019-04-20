package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.Trainer;

import java.util.List;

public interface TrainerService extends OperateBaseService<Trainer> {
    List<Trainer> searchByMemberIdAndTrainerId(String memberId, String trainerId);
    List<Trainer> findAllWithMemberId();
}
