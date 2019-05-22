package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.PositionMapper;
import com.xidian.meiping.entity.Employee;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.service.EmployeeService;
import com.xidian.meiping.service.service.MemberService;
import com.xidian.meiping.service.service.PositionService;
import com.xidian.meiping.util.ConstValue;
import com.xidian.meiping.util.JSONUtil;
import com.xidian.meiping.util.StatusCode;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.lang.model.type.ErrorType;
import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {
    @Autowired
    private PositionMapper positionMapper;

    @Autowired
    private EmployeeService employeeService;

    @Override
    public List<Position> findAll() {
        return positionMapper.selectAll();
    }

    @Override
    public int update(Position example) {
        return positionMapper.updateByPrimaryKey(example);
    }

    @Override
    public int add(Position example) {
        return positionMapper.insert(example);
    }

    @Override
    public Position findById(Integer Id) {
        return positionMapper.selectByPrimaryKey(Id);
    }

    @Override
    public int deleteById(Integer Id) {
        Position position = positionMapper.selectByPrimaryKey(Id);
        List<Employee> employees = employeeService.searchByKeyAndValue("position",position.getName());
        System.out.println(JSONArray.fromObject(employees));
        if(employees!=null&&employees.size()!=0)
            return StatusCode.EXIST_USING;
        return positionMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<Position> searchByKeyAndValue(String key, String value) {
        return null;
    }
}
