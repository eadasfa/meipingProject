package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.OperaterMapper;
import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.OperaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "operaterService")
public class OperaterServiceImpl implements OperaterService {

    @Autowired
    private OperaterMapper operaterMapper;

    @Override
    public int addOperater(Operater operater) {
        return operaterMapper.insert(operater);
    }

    @Override
    public void delete(Integer id) {
        operaterMapper.deleteByPrimaryKey(id);
    }

    @Override
    public Operater findByIdIncludePw(Integer id) {
        if(null == id ) return null;
        return operaterMapper.selectByPrimaryKeyIncludePw(id);
    }

    @Override
    public Operater findById(Integer id) {
        if(null == id ) return null;
        return operaterMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Operater> findAll() {
        return operaterMapper.selectAll();
    }
}
