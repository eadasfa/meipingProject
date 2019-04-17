package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Card;
import com.xidian.meiping.service.service.CardService;
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

@Controller
@RequestMapping("/systemSetting")
public class MemberCardSettingController {
    @Autowired
    private CardService cardService;
    @ResponseBody
    @RequestMapping(value="/getCards",produces = "text/html;charset=UTF-8")
    public String getCards(HttpServletRequest request, HttpServletResponse response, HttpSession session){
//        List<Card> list = cardService.findAll();
//        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        return jsonArray.toString();
        return JSONArray.fromObject(cardService.findAll()).toString();
    }
    @ResponseBody
    @RequestMapping(value="/card/operate",produces = "text/html;charset=UTF-8")
    public String cardOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        Card card=new Card();
        if(!operateId.equals(ConstValue.DELETE))
            card = (Card) CommonUtil.newInstance(card,request);
        CommonController.operate(operateId,cardService,request,card);
        return JSONUtil.ObjecttoJson(cardService.findById(card.getId()),
                true,"I'm houtai");
    }
}
