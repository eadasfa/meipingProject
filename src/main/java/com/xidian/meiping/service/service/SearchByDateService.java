package com.xidian.meiping.service.service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface SearchByDateService<T>{
    List<T> searchByDate(String date1, String date2,String memberId, String goodId, String operaterId);
    default List<T> searchByDate(HttpServletRequest request) {
        return null;
    }
}
