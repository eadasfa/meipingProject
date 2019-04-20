package com.xidian.meiping.controller.memberManageController;

import com.xidian.meiping.entity.RendTrainerLog;
import com.xidian.meiping.entity.Trainer;
import com.xidian.meiping.service.service.RendTrainerLogService;
import com.xidian.meiping.service.service.TrainerService;
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
@RequestMapping("/memberManage")
public class TrainerManageController {
    @Autowired
    private TrainerService trainerService;
    @Autowired
    private RendTrainerLogService rendTrainerLogService;
    @ResponseBody
    @RequestMapping(value="/getTrainersByMemberId",produces = "text/html;charset=UTF-8")
    public String getTrainersByMemberId(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Trainer> list = trainerService.findAllWithMemberId();
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/getTrainers",produces = "text/html;charset=UTF-8")
    public String getTrainers(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Trainer> list = trainerService.findAll();
        return JSONArray.fromObject(list).toString();
    }
    @ResponseBody
    @RequestMapping(value="/trainer/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        List list=null;
        if(operateId.equals(ConstValue.SEARCH)){
            String memberId = request.getParameter("memberId");
            String trainerId = request.getParameter("trainerId");
            list = trainerService.searchByMemberIdAndTrainerId(memberId,trainerId);

        }else if(operateId.equals(ConstValue.SEARCH_TRAINER_LOG)){
            list = rendTrainerLogService.findByMemberId(request.getParameter("memberId"));
        }else if(operateId.equals(ConstValue.REND_TRAINER)){
            RendTrainerLog log = (RendTrainerLog) CommonUtil.newInstance(new RendTrainerLog(),request);
            rendTrainerLogService.add(log);
        }
        return JSONUtil.toJsonString(list,true,"");
    }
}
