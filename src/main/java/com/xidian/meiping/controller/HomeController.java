package com.xidian.meiping.controller;

import com.xidian.meiping.entity.Menu;
import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.service.MenuService;
import com.xidian.meiping.service.service.OperaterService;

import com.xidian.meiping.util.JSONUtil;
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

    @RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
    public String homePage(Model model) {
//        setModel(model);
        return "home";
    }
    @RequestMapping("/home/{fileName}/{html}")
    public String changeContentWrapper(@PathVariable("fileName") String fileName,
                                       @PathVariable("html") String html) {

        return fileName+"/"+html;
    }

    @ResponseBody
    @RequestMapping(value="/menu/getMenuList",produces = "text/html;charset=UTF-8")
    public String getMenuList(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Menu> list = menuService.getAllMenu();
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
        System.out.println("getMenuList：ENTER");
        return jsonArray.toString();
    }
    @ResponseBody
    @RequestMapping(value="/getCurrentOperater",produces = "text/html;charset=UTF-8")
    public String getCurrentOperater(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String id = user.getUsername(); //saysky 或 空指针异常
        Operater operater = operaterService.findById(Integer.parseInt(id));
        return JSONUtil.ObjecttoJson(operater, true,"");
    }
    private void setModel(Model model) {
        //如果登录了，name即用户名；如果没有登录，默认为 anonymousUser
        //方法一、
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = auth.getName(); //主体名，即登录用户名
//        System.out.println(name);//saysky 或 anonymousUser
        //2
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String id = user.getUsername(); //saysky 或 空指针异常
//        System.out.println(id);
        Operater operater = operaterService.findById(Integer.parseInt(id));
        model.addAttribute("id",operater.getId());
        model.addAttribute("name",operater.getName());
        model.addAttribute("permission",operater.getPermission());
    }
}