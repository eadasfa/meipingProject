package com.xidian.meiping.controller.systemSettingController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.dao.WardrobeMapper;
import com.xidian.meiping.entity.RendWardrobeLog;
import com.xidian.meiping.entity.Wardrobe;
import com.xidian.meiping.service.service.RendWardrobeLogService;
import com.xidian.meiping.service.service.WardrobeService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import com.xidian.meiping.util.StatusCode;
import net.sf.json.JSONArray;
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
    @Autowired
    private RendWardrobeLogService logService;
    @ResponseBody
    @RequestMapping(value="/getWardrobes",produces = "text/html;charset=UTF-8")
    public String getWardobes(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        return JSONArray.fromObject(wardrobeService.findAll()).toString();
    }
    @ResponseBody
    @RequestMapping(value="/getRendWardrobeLogs",produces = "text/html;charset=UTF-8")
    public String getRendWardrobeLogs(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<RendWardrobeLog> list = logService.findAll();
//        for (RendWardrobeLog r:list){
//            System.out.println(r);
//        }
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/wardrobe/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response,
                          HttpSession session){
        String operateId = request.getParameter("operateId");
        StringBuilder context = new StringBuilder("");
        if(operateId.equals(ConstValue.SEARCH)){
            return CommonController.searchByKeyAndValue(request,wardrobeService);
        }
        if(operateId.equals(ConstValue.SEARCH_WARDROBE_LOG)){
            List<RendWardrobeLog> list = logService.searchByTheseKey(
                    request.getParameter("from"),
                    request.getParameter("to"),
                    request.getParameter("memberId"),
                    request.getParameter("operaterId")
            );
            return JSONUtil.toJsonString(list,true,"");
        }
        if(operateId.equals(ConstValue.ADDMANY)){
            return addManyWardrobes(request);
        }
        if(operateId.equals(ConstValue.REND_WARDROBE)){
            int temp = wardrobeService.rendWardrobe(request);
            if(temp!=1) return JSONUtil.toJsonString(null,false, StatusCode.setContext(temp,ConstValue.REND_WARDROBE,context).toString());
            return JSONUtil.ObjecttoJson(wardrobeService.findById(Integer.parseInt(request.getParameter("id"))),true,"");
        }
        if(operateId.equals(ConstValue.REND_WARDROBE_MORE)){
            int temp= wardrobeService.rendWardrobeMore(request);
            if(temp==0) return JSONUtil.toJsonString(null,false,"失败");
            return JSONUtil.ObjecttoJson(wardrobeService.findById(Integer.parseInt(request.getParameter("id"))),true,"");
        }
        if(operateId.equals(ConstValue.RETURN_WARDROBE)){
            int temp= wardrobeService.returnWardrobe(request);
            if(temp==0) return JSONUtil.toJsonString(null,false,"失败");
            return JSONUtil.ObjecttoJson(wardrobeService.findById(Integer.parseInt(request.getParameter("id"))),true,"");
        }
        Wardrobe wardrobe = new Wardrobe();
        if(!operateId.equals(ConstValue.DELETE))
            wardrobe = (Wardrobe) CommonUtil.newInstance(wardrobe,request);
//        else wardrobe=new Wardrobe();
        boolean flag = CommonController.operate(operateId,wardrobeService,request,wardrobe,context);
        return JSONUtil.ObjecttoJson(wardrobeService.findById(wardrobe.getId()),
                flag,context.toString());
    }
    private String addManyWardrobes(HttpServletRequest request) {
        List<Wardrobe> list = new ArrayList<>();
        int from = Integer.parseInt(request.getParameter("from"));
        int to = Integer.parseInt(request.getParameter("to"));
        int status = Integer.parseInt(request.getParameter("status"));
        double price = Double.parseDouble(request.getParameter("price"));
        for(;from<=to;from++){
            Wardrobe wardrobe = new Wardrobe();
            wardrobe.insertOrUpdate = true;
            wardrobe.setId(from);
            wardrobe.setStatus(status);
            wardrobe.setPrice(price);
            if(wardrobeService.add(wardrobe)==1) list.add(wardrobe);
        }
        String context = "共插入"+list.size()+"条记录！";
//        System.out.println(context);
        return JSONUtil.toJsonString(list, true,context);
    }


}
