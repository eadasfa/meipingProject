package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.SellingLog;

import java.util.List;

public interface SellingLogService extends SearchByDateService<SellingLog>,OperateBaseService<SellingLog>{
    List<SellingLog> findAll();
}
