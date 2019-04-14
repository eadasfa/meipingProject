package com.xidian.meiping.service;

import com.xidian.meiping.entity.Operater;

import java.util.List;

public interface OperaterService {
    int addOperater(Operater operater);

    void delete(Integer id);

    Operater findByIdIncludePw(Integer id);
    Operater findById(Integer id);

    List<Operater> findAll();
}
