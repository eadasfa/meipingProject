package com.xidian.meiping.controller;

import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
    public String homePage() {


        //如果登录了，name即用户名；如果没有登录，默认为 anonymousUser
        //方法一、
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = auth.getName(); //主体名，即登录用户名
//        System.out.println(name);//saysky 或 anonymousUser
        //2
//        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String name2 = user.getUsername(); //saysky 或 空指针异常
//        System.out.println(name2);

        return "index";
    }

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }

}