package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.entity.Employee;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.EmployeeService;
import com.xidian.meiping.service.PositionService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/systemSetting")
public class EmployeeSettingController {
    @Autowired
    private EmployeeService employeeService;

    @ResponseBody
    @RequestMapping(value="/getEmployees",produces = "text/html;charset=UTF-8")
    public String getEmployees(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        List<Employee> list = employeeService.findAll();
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
//        System.out.println("得到衣柜信息:"+jsonArray.toString());
        return jsonArray.toString();
    }
    @ResponseBody
    @RequestMapping(value="/employee/operate",produces = "text/html;charset=UTF-8")
    public String wardrobeOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        if(operateId.equals(ConstValue.SEARCH)){
            return SystemSetting.searchByKeyAndValue(request,employeeService);
        }
        Employee employee = null;
        if(!operateId.equals(ConstValue.DELETE))
            employee = Employee.newInstance(request);
        else employee=new Employee();
        SystemSetting.operate(operateId,employeeService,request,employee);
        return JSONUtil.ObjecttoJson(employeeService.findById(employee.getId()),
                true,"I'm houtai");
    }

}
