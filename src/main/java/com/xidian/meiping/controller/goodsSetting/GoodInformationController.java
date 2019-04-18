package com.xidian.meiping.controller.goodsSetting;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Good;
import com.xidian.meiping.service.service.GoodService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static com.xidian.meiping.util.CommonUtil.newInstance;

@Controller
@RequestMapping("/goodsSetting")
public class GoodInformationController {

    @Autowired
    private GoodService goodService;
    @ResponseBody
    @RequestMapping(value="/getGoods",produces = "text/html;charset=UTF-8")
    public String getGoods(HttpServletRequest request, HttpServletResponse response, HttpSession session){
//        List<Good> list = goodService.findAll();
//        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        System.out.println("GOODS:"+jsonArray.toString());
//        return jsonArray.toString();

        return JSONArray.fromObject(goodService.findAll()).toString();
    }
    @ResponseBody
    @RequestMapping(value="/good/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        if(operateId.equals(ConstValue.SEARCH)){
            return CommonController.searchByKeyAndValue(request,goodService);
        }
        Good good = new Good();
        if(!operateId.equals(ConstValue.DELETE))
            good = (Good)newInstance(good,request);
        CommonController.operate(operateId,goodService,request,good);
        return JSONUtil.ObjecttoJson(goodService.findById(good.getId()),
                true,"I'm houtai");
    }
}
