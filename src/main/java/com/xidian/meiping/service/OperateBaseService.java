package com.xidian.meiping.service;

import java.util.List;

public interface OperateBaseService<T> {
    List<T> getAll();
    int update(T example);
    int add(T example);
    T selectById(Integer Id);
    int deleteById(Integer Id);
}
