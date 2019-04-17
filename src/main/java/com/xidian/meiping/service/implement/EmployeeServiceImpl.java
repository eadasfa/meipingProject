package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.EmployeeMapper;
import com.xidian.meiping.entity.Employee;
import com.xidian.meiping.service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
    @Override
    public List<Employee> findAll() {
        return employeeMapper.selectAll();
    }

    @Override
    public int update(Employee example) {
        return employeeMapper.updateByPrimaryKeySelective(example);
    }

    @Override
    public int add(Employee example) {
        Employee temp = employeeMapper.selectByPrimaryKey(example.getId());
        if(temp==null)
            return employeeMapper.insert(example);
        return 0;
    }

    @Override
    public Employee findById(Integer Id) {
        return employeeMapper.selectByPrimaryKey(Id);
    }

    @Override
    public int deleteById(Integer Id) {
        return employeeMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<Employee> searchByKeyAndValue(String key, String value) {
        List<Employee> list = null;
        switch (key){
            case "id":
                list = new ArrayList<>();
                list.add(employeeMapper.selectByPrimaryKey(Integer.parseInt(value)));
                break;
            case "name":
                list = employeeMapper.selectByName(value);
                break;
            case  "teleNumber":
                list = employeeMapper.selectByTeleNumber(value);
                break;
            case  "position":
                list = employeeMapper.selectByPosition(value);
                break;
            default:
        }
        return list;
    }
}
