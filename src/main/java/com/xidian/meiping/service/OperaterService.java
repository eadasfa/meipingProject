package com.xidian.meiping.service;

import com.xidian.meiping.entity.Operater;

public interface OperaterService {
    int addOperater(Operater operater);

    void delete(Integer id);

    Operater findById(Integer id);
}
