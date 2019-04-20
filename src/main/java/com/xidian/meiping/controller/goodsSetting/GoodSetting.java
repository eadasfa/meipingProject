package com.xidian.meiping.controller.goodsSetting;

import com.xidian.meiping.entity.BuyingLog;
import com.xidian.meiping.service.service.SearchByDateService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class GoodSetting {
    public static String operate(HttpServletRequest request, SearchByDateService searchByDateService){
        String operateId = request.getParameter("operateId");
        if(!operateId.equals(ConstValue.SEARCH)&&!operateId.equals(ConstValue.SEARCH_SELLING_LOG)){
            return JSONUtil.ObjecttoJson(null,
                    false,"当前操作不是查询");
        }
        List list = null;
        if(operateId.equals(ConstValue.SEARCH_SELLING_LOG)){
            list = searchByDateService.searchByDate(request);
        }else{
            String from = request.getParameter("from");
            String to = request.getParameter("to");
            String goodId = request.getParameter("goodId");
            String operaterId = request.getParameter("operaterId");
            String memberId = request.getParameter("memberId");
            list = searchByDateService.searchByDate(from,to,memberId,goodId,operaterId);
        }
        return JSONUtil.toJsonString(list,true,"");
    }
}
