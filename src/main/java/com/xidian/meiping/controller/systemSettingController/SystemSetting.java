package com.xidian.meiping.controller.systemSettingController;
import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Card;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.service.PositionService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import net.sf.json.JSONArray;
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
        List<Position> list = positionService.findAll();
        System.out.println("Position:"+list.toString());
        return JSONUtil.toJsonString(list,true,"");
    }
    @ResponseBody
    @RequestMapping(value="/getPositions",produces = "text/html;charset=UTF-8")
    public String getPositions(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        return JSONArray.fromObject(positionService.findAll()).toString();
    }

    @ResponseBody
    @RequestMapping(value="/position/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        Position position=new Position();
        StringBuilder context = new StringBuilder("失败");
        if(!operateId.equals(ConstValue.DELETE))
            position = (Position) CommonUtil.newInstance(position,request);
        boolean flag = CommonController.operate(operateId,positionService,request,position,context);
        return JSONUtil.ObjecttoJson(positionService.findById(position.getId()),
                flag,context.toString());
    }
}
