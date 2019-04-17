package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.OperaterMapper;
import com.xidian.meiping.entity.Operater;
import com.xidian.meiping.service.service.OperaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "operaterService")
public class OperaterServiceImpl implements OperaterService {

    @Autowired
    private OperaterMapper operaterMapper;

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
    public int deleteById(Integer Id) {
        return operaterMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<Operater> searchByKeyAndValue(String key, String value) {
        return null;
    }

    @Override
    public List<Operater> findAll() {
        return operaterMapper.selectAll();
    }

    @Override
    public int update(Operater example) {
        return operaterMapper.updateByPrimaryKeySelective(example);
    }

    @Override
    public int add(Operater example) {
        return operaterMapper.insert(example);
    }
}
