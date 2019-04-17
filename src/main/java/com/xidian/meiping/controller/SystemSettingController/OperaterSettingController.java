package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.service.OperaterService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/systemSetting")
public class OperaterSettingController {
    @Autowired
    private OperaterService operaterService;
    @ResponseBody
    @RequestMapping(value="/getOperaters",produces = "text/html;charset=UTF-8")
    public String getOperaters(HttpServletRequest request, HttpServletResponse response, HttpSession session){
//        List<Operater> list = operaterService.findAll();
//        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        System.out.println("得到操作员信息:"+jsonArray.toString());
//        return jsonArray.toString();
        return JSONArray.fromObject(operaterService.findAll()).toString();
    }
    @ResponseBody
    @RequestMapping(value="/operater/operate",produces = "text/html;charset=UTF-8")
    public String operaterOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        Operater operater = null;
        if(!operateId.equals(ConstValue.DELETE))
            operater = (Operater) CommonUtil.newInstance(operater,request);
        else if(operateId.equals(ConstValue.DELETE)){
            String id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                        .getUsername();
            if(!id.equals(request.getParameter("id")))
                operater=new Operater();
            else
                return JSONUtil.ObjecttoJson(null,
                        false,"当前用户正在使用");
        }
        CommonController.operate(operateId,operaterService,request,operater);
        return JSONUtil.ObjecttoJson(operaterService.findById(operater.getId()),
                true,"I'm houtai");
    }
}
