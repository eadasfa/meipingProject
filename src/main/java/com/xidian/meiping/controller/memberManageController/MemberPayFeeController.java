package com.xidian.meiping.controller.memberManageController;
import com.xidian.meiping.controller.goodsSetting.GoodSetting;
import com.xidian.meiping.entity.MemberCardBuyLog;
import com.xidian.meiping.service.service.MemberCardBuyLogService;

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
@RequestMapping("/memberManage")
public class MemberPayFeeController {
    @Autowired
    private MemberCardBuyLogService memberLogService;
    @ResponseBody
    @RequestMapping(value="/getMemberCardBuyLogs",produces = "text/html;charset=UTF-8")
    public String getMemberCardBuyLogs(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<MemberCardBuyLog> list = memberLogService.findAll();
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/member_pay_log/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        return GoodSetting.operate(request,memberLogService);
    }
}
