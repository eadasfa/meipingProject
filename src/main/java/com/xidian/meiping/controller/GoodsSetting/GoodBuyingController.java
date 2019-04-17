package com.xidian.meiping.controller.GoodsSetting;

import com.xidian.meiping.dao.GoodMapper;
import com.xidian.meiping.entity.BuyingLog;
import com.xidian.meiping.entity.ReturnLog;
import com.xidian.meiping.service.service.BuyingLogService;
import com.xidian.meiping.service.service.ReturnLogService;
import com.xidian.meiping.util.CommonUtil;
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
import java.util.List;

@Controller
@RequestMapping("/goodsSetting")
public class GoodBuyingController {
    @Autowired
    private BuyingLogService buyingLogService;
    @Autowired
    private ReturnLogService returnLogService;
    @ResponseBody
    @RequestMapping(value="/getBuyingLogs",produces = "text/html;charset=UTF-8")
    public String getBuyingLogs(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<BuyingLog> list = buyingLogService.findAll();
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/buying_log/operate",produces = "text/html;charset=UTF-8")
    public String goodOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        if(operateId.equals(ConstValue.CHECK_IN)){
            BuyingLog buyingLog = (BuyingLog)CommonUtil.newInstance(new BuyingLog(),request);
            buyingLogService.add(buyingLog);
            return JSONUtil.ObjecttoJson(null,true,"");
        } else if(operateId.equals(ConstValue.RETURN_GOODS)){
            ReturnLog returnLog = (ReturnLog)CommonUtil.newInstance(new ReturnLog(),request);
            returnLogService.add(returnLog);
            return JSONUtil.ObjecttoJson(null,true,"");
        }else if(operateId.equals(ConstValue.SEARCH)){
            return GoodSetting.operate(request,buyingLogService);
        }
        return JSONUtil.toJsonString(null,true,"");
    }
}
