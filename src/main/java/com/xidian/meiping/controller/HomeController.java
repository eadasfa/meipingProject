package com.xidian.meiping.controller;

import com.github.pagehelper.PageInfo;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.entity.Menu;
import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.MemberService;
import com.xidian.meiping.service.MenuService;
import com.xidian.meiping.service.OperaterService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private OperaterService operaterService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private MemberService memberService;

    @RequestMapping(value = { "/", "/index","/home" }, method = RequestMethod.GET)
    public String homePage(Model model) {
        setHeaderModel(model);
        return "home";
    }
    @RequestMapping(value = "/home/{fileName}/{html}", method = RequestMethod.GET)
    public String changeContentWrapper(@PathVariable("fileName") String fileName,                         @PathVariable("html") String html) {
        return fileName+"/"+html;
    }
    //返回菜单列表
    @ResponseBody
    @RequestMapping(value = "/menu/getMenuList",produces="text/html;charset=UTF-8")
    public String getMenuList(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Menu> list = menuService.findAll();
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data",jsonArray.toString());
        System.out.println(jsonArray.toString());
        return jsonArray.toString();
    }
    @ResponseBody
    @RequestMapping(value = "/getMember",produces="text/html;charset=UTF-8")
    public String getMember(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        PageInfo<Member> list = memberService.findAllMember(1,11);
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("data",jsonArray.toString());
        System.out.println(jsonArray.toString());
        return jsonArray.toString();
    }

    private void setHeaderModel(Model model) {
        //如果登录了，name即用户名；如果没有登录，默认为 anonymousUser
        //方法一、
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = auth.getName(); //主体名，即登录用户名
//        System.out.println(name);//saysky 或 anonymousUser
        //2
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String id = user.getUsername(); //saysky 或 空指针异常
        System.out.println(id);
        Operater operater = operaterService.findById(Integer.parseInt(id));
        model.addAttribute("id",id);
        model.addAttribute("permission",operater.getPermission());
        model.addAttribute("name",operater.getName());
    }
}