package com.xidian.meiping.service.service;

import java.util.List;

public interface OperateBaseService<T> {
    List<T> findAll();
    int update(T example);
    int add(T example);
    T findById(Integer Id);
    int deleteById(Integer Id);
    List<T> searchByKeyAndValue(String key,String value);
}
