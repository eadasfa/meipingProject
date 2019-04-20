package com.xidian.meiping.controller.goodsSetting;

import com.xidian.meiping.entity.SellingLog;
import com.xidian.meiping.service.service.SellingLogService;
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
@RequestMapping("/goodsSetting")
public class GoodSellingController {
    @Autowired
    private SellingLogService sellingLogService;
    @ResponseBody
    @RequestMapping(value="/getSellingLogs",produces = "text/html;charset=UTF-8")
    public String getSellingLogs(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<SellingLog> list = sellingLogService.findAll();
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/getSellingLogsByCredit",produces = "text/html;charset=UTF-8")
    public String getSellingLogsByCredit(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<SellingLog> list = sellingLogService.findAll(1+"");
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/selling_log/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        return GoodSetting.operate(request,sellingLogService);
    }
}
