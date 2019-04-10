package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.entity.Wardrobe;
import com.xidian.meiping.service.WardrobeService;
import com.xidian.meiping.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/systemSetting")
public class WardrobeSettingController {
    @Autowired
    private WardrobeService wardrobeService;
    @ResponseBody
    @RequestMapping(value="/getWardrobes",produces = "text/html;charset=UTF-8")
    public String getWardobes(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Wardrobe> list = wardrobeService.getAll();
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        System.out.println("得到衣柜信息:"+jsonArray.toString());
        return jsonArray.toString();
    }
    @ResponseBody
    @RequestMapping(value="/wardrobe/operate",produces = "text/html;charset=UTF-8")
    public String wardrobeOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        if(operateId.equals("addMany")){
            return addManyWardrobes(request);
        }
        Wardrobe wardrobe = null;
        if(!operateId.equals("delete"))
            wardrobe = Wardrobe.newInstance(request);
        else wardrobe=new Wardrobe();
        SystemSetting.operate(operateId,wardrobeService,request,wardrobe);
        return JSONUtil.ObjecttoJson(wardrobeService.selectById(wardrobe.getId()),"data",
                true,"I'm houtai");
    }

    private String addManyWardrobes(HttpServletRequest request) {
        List<Wardrobe> list = new ArrayList<>();
        int from = Integer.parseInt(request.getParameter("from"));
        int to = Integer.parseInt(request.getParameter("to"));
        int status = Integer.parseInt(request.getParameter("status"));
        for(;from<=to;from++){
            Wardrobe wardrobe = new Wardrobe();
            wardrobe.setId(from);
            wardrobe.setStatus(status);
            if(wardrobeService.add(wardrobe)==1)list.add(wardrobe);
        }
        String context = "共插入"+list.size()+"条记录！";
        System.out.println(context);
        return JSONUtil.toJsonString(list,"data",
                true,context);
    }
}