package com.xidian.meiping.controller;

import com.xidian.meiping.service.service.OperateBaseService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import com.xidian.meiping.util.StatusCode;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class CommonController {
    public static boolean operate(String operateId, OperateBaseService operateBaseService,
            HttpServletRequest request, Object o,StringBuilder context) {
        int t = 0;
        switch (operateId){
            case ConstValue.ADD:
                t=operateBaseService.add(o);
                context.append("当前Id已经存在");
                break;
            case ConstValue.UPDATE:
                t=operateBaseService.update(o);
                break;
            case ConstValue.DELETE:
                t=operateBaseService.deleteById(Integer.parseInt(request.getParameter("id")));
                if(context!=null){
                    context.append("当前记录可能正在被使用，不能删除!");
                }
                break;
            default:
        }
        StatusCode.setContext(t,operateId,context);
        return t== StatusCode.RIGHT;
    }
    public static boolean operate(String operateId, OperateBaseService operateBaseService,
                                  HttpServletRequest request, Object o) {
       return operate(operateId,operateBaseService,request,o,null);
    }
    public static String searchByKeyAndValue(HttpServletRequest request,OperateBaseService operateBaseService){
        String key = request.getParameter("key");
        String value = request.getParameter("value");
        List list = null;
        System.out.println("searchByKeyAndValue():key="+key+" value="+value);
        if(value==null||value.equals(""))
            list = operateBaseService.findAll();
        else{
            list = operateBaseService.searchByKeyAndValue(key,value.trim());
        }
        return JSONUtil.toJsonString(list,true,"");
    }
}
