package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.OffDay;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface OffDayService  extends  OperateBaseService<OffDay> {
    List<OffDay> seachByDate(HttpServletRequest request);
}
