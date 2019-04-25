package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.SellingLog;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface SellingLogService extends SearchByDateService<SellingLog>,OperateBaseService<SellingLog>{
    List<SellingLog> findAll();
    List<SellingLog> findAll(String type);
    SellingLog buyGood(HttpServletRequest request);
}
