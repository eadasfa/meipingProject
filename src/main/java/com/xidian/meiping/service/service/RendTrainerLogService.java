package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.RendTrainerLog;

import java.util.List;

public interface RendTrainerLogService extends OperateBaseService<RendTrainerLog>{
    List<RendTrainerLog> findByMemberId(String memberId);
}
