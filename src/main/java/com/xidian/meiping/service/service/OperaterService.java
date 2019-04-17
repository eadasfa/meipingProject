package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.Operater;

public interface OperaterService extends OperateBaseService<Operater>{

    Operater findByIdIncludePw(Integer id);
    Operater findById(Integer id);
}
