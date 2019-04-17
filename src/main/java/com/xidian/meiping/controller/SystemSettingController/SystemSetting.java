package com.xidian.meiping.controller.SystemSettingController;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.service.PositionService;
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

    @ResponseBody
    @RequestMapping(value="/getPosition",produces = "text/html;charset=UTF-8")
    public String getPosition(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Position> list = positionService.getAll();
//        System.out.println("Position:"+list.toString());
        return JSONUtil.toJsonString(list,true,"");
    }

}
