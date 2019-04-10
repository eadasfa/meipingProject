package com.xidian.meiping.controller.SystemSettingController;
import com.xidian.meiping.service.OperateBaseService;
import javax.servlet.http.HttpServletRequest;
public class SystemSetting {
    public static boolean operate(String operateId, OperateBaseService operateBaseService,
                         HttpServletRequest request,Object o) {
        boolean flag = true;
        int t = 0;
        switch (operateId){
            case "add":
                t=operateBaseService.add(o);
                break;
            case "update":
                t=operateBaseService.update(o);
                break;
            case "delete":
                t=operateBaseService.deleteById(Integer.parseInt(request.getParameter("id")));
                break;
            default:
        }
        System.out.println(operateId+":t="+t);
        return flag;
    }
}
