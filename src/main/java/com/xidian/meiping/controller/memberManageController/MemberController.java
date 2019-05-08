package com.xidian.meiping.controller.memberManageController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.service.service.MemberService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import net.sf.json.JSONArray;
import org.apache.tomcat.util.bcel.Const;
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
        String s = JSONArray.fromObject(memberService.findAll()).toString();
        System.out.println("getMembers:"+s);
        return s;
    }
    @ResponseBody
    @RequestMapping(value="/member/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        StringBuilder context = new StringBuilder("");
        Member member = new Member();
        boolean flag=true;
        if(operateId.equals(ConstValue.FIND_BY_ID)){
            return JSONUtil.ObjecttoJson(memberService.findById(Integer.parseInt(request.getParameter("id"))),true,"");
        }
        if(!operateId.equals(ConstValue.DELETE))
            member = (Member) CommonUtil.newInstance(member,request);
        if(operateId.equals(ConstValue.TOP_UP)){
            flag = 1==memberService.updateTopUp(member);
            return JSONUtil.toJsonString(null, flag,"删除失败");
        }
        flag = CommonController.operate(operateId,memberService,request,member,context);
        if(operateId.equals(ConstValue.DELETE)){
            return JSONUtil.toJsonString(null,
                    flag,"删除失败");
        }
        return JSONUtil.ObjecttoJson(memberService.findById(member.getId()),
                flag,context.toString());
    }
}
