package com.xidian.meiping.controller.memberManageController;

import com.xidian.meiping.service.service.MemberService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/memberManage")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @ResponseBody
    @RequestMapping(value="/getMembers",produces = "text/html;charset=UTF-8")
    public String getMembers(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        return JSONArray.fromObject(memberService.findAll()).toString();
    }
}
