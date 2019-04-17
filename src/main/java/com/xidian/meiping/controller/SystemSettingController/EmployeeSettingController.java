package com.xidian.meiping.controller.SystemSettingController;

import com.xidian.meiping.controller.CommonController;
import com.xidian.meiping.entity.Employee;

import com.xidian.meiping.service.service.EmployeeService;
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
    public String employeeOperate(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        String operateId = request.getParameter("operateId");
        if(operateId.equals(ConstValue.SEARCH)){
            return CommonController.searchByKeyAndValue(request,employeeService);
        }
        Employee employee = new Employee();
        if(!operateId.equals(ConstValue.DELETE))
            employee = (Employee) CommonUtil.newInstance(employee,request);

        CommonController.operate(operateId,employeeService,request,employee);
        return JSONUtil.ObjecttoJson(employeeService.findById(employee.getId()),
                true,"I'm houtai");
    }

}
