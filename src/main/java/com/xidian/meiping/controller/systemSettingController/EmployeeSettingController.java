package com.xidian.meiping.controller.systemSettingController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Employee;

import com.xidian.meiping.entity.Trainer;
import com.xidian.meiping.service.service.EmployeeService;
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

@Controller
@RequestMapping("/systemSetting")
public class EmployeeSettingController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TrainerService trainerService;

    @ResponseBody
    @RequestMapping(value="/getEmployees",produces = "text/html;charset=UTF-8")
    public String getEmployees(HttpServletRequest request, HttpServletResponse response, HttpSession session){
//        List<Employee> list = employeeService.findAll();
//        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        System.out.println("得到Employee信息:"+jsonArray.toString());
//        return jsonArray.toString();
        return JSONArray.fromObject(employeeService.findAll()).toString();
    }
    @ResponseBody
    @RequestMapping(value="/employee/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        StringBuilder context = new StringBuilder("失败");
        if(operateId.equals(ConstValue.SEARCH)){
            return CommonController.searchByKeyAndValue(request,employeeService);
        }
        if(operateId.equals(ConstValue.SEARCH_TRAINER_BY_ID)){
            Integer trainerId = Integer.parseInt(request.getParameter("trainerId"));
            Trainer trainer = trainerService.findById(trainerId);
            return JSONUtil.ObjecttoJson(trainer,trainer!=null,"失败");
        }
        Employee employee = new Employee();
        if(!operateId.equals(ConstValue.DELETE))
            employee = (Employee) CommonUtil.newInstance(employee,request);

        boolean flag = CommonController.operate(operateId,employeeService,request,employee,context);
        return JSONUtil.ObjecttoJson(employeeService.findById(employee.getId()),
                flag ,context.toString());
    }

}
