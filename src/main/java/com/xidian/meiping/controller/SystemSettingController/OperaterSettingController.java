package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.OperaterService;
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
public class OperaterSettingController {
    @Autowired
    private OperaterService operaterService;
    @ResponseBody
    @RequestMapping(value="/getOperaters",produces = "text/html;charset=UTF-8")
    public String getOperaters(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Operater> list = operaterService.findAll();
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
        System.out.println("得到衣柜信息:"+jsonArray.toString());
        return jsonArray.toString();
    }
    @ResponseBody
    @RequestMapping(value="/operater/operate",produces = "text/html;charset=UTF-8")
    public String operaterOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
      return "";
    }
}
