package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.BuyingLog;

import java.util.List;

public interface BuyingLogService extends SearchByDateService<BuyingLog>,OperateBaseService<BuyingLog>{
    List<BuyingLog> findAll();
}
