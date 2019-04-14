package com.xidian.meiping.dao;

import com.xidian.meiping.entity.Employee;

import java.util.List;

public interface EmployeeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Employee record);

    int insertSelective(Employee record);

    Employee selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Employee record);

    int updateByPrimaryKey(Employee record);

    List<Employee> selectAll();

    List<Employee> selectByName(String name);

    List<Employee> selectByTeleNumber(String teleNumber);

    List<Employee> selectByPosition(String position);
}