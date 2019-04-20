package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.EmployeeMapper;
import com.xidian.meiping.dao.TrainerMapper;
import com.xidian.meiping.entity.Employee;
import com.xidian.meiping.entity.Trainer;
import com.xidian.meiping.service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.ldap.PagedResultsControl;
import java.util.ArrayList;
import java.util.List;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private TrainerMapper trainerMapper;
    @Override
    public List<Employee> findAll() {
        return employeeMapper.selectAll();
    }

    @Override
    @Transactional
    public int update(Employee example) {
        String position = example.getPosition();
        if(position.equals("私教")){
            Trainer t = trainerMapper.selectByPrimaryKey(example.getId());
            if(t==null){
                t = new Trainer();
                t.setStatus(0);
                t.setPrice(example.getPrice());
                t.setTrainerId(example.getId());
                t.setRendTrainerLogId(0);
                t.setMemberId(0);
                trainerMapper.insert(t);
            }else{
                t.setPrice(example.getPrice());
                trainerMapper.updateByPrimaryKeySelective(t);
            }
        }
        return employeeMapper.updateByPrimaryKeySelective(example);
    }

    @Override
    @Transactional
    public int add(Employee example) {
        Employee temp = employeeMapper.selectByPrimaryKey(example.getId());
        if(temp==null) {
            int i=employeeMapper.insert(example);
            String position = example.getPosition();
            if (position.equals("私教")) {
                Trainer t = new Trainer();
                t.setStatus(0);
                t.setPrice(example.getPrice());
                t.setTrainerId(example.getId());
                t.setRendTrainerLogId(0);
                t.setMemberId(0);
                trainerMapper.insert(t);
            }
            return i;
        }
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
