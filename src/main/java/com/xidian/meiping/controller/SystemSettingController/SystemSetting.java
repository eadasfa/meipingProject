package com.xidian.meiping.controller.SystemSettingController;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.OperateBaseService;
import com.xidian.meiping.service.PositionService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/systemSetting")
public class SystemSetting {
    @Autowired
    private PositionService positionService;

    public static boolean operate(String operateId, OperateBaseService operateBaseService,
                         HttpServletRequest request,Object o) {
        boolean flag = true;
        int t = 0;
        switch (operateId){
            case ConstValue.ADD:
                t=operateBaseService.add(o);
                break;
            case ConstValue.UPDATE:
                t=operateBaseService.update(o);
                break;
            case ConstValue.DELETE:
                t=operateBaseService.deleteById(Integer.parseInt(request.getParameter("id")));
                break;
            default:
        }
        System.out.println(operateId+":t="+t);
        return flag;
    }
    public static String searchByKeyAndValue(HttpServletRequest request,OperateBaseService operateBaseService){
        String key = request.getParameter("key");
        String value = request.getParameter("value").trim();
        List list = null;
        System.out.println("searchByKeyAndValue():key="+key+" value="+value);
        if(value==null||value.equals(""))
            list = operateBaseService.findAll();
        else{
            list = operateBaseService.searchByKeyAndValue(key,value);
        }
        return JSONUtil.toJsonString(list,true,"");
    }
    @ResponseBody
    @RequestMapping(value="/getPosition",produces = "text/html;charset=UTF-8")
    public String getPosition(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Position> list = positionService.getAll();
        return JSONUtil.toJsonString(list,true,"");
    }

}
