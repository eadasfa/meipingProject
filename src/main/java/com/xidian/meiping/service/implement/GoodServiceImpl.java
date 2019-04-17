package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.GoodMapper;
import com.xidian.meiping.entity.Good;
import com.xidian.meiping.service.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodMapper goodMapper;
    @Override
    public List<Good> findAll() {
        return goodMapper.selectAll();
    }

    @Override
    public int update(Good example) {
        return goodMapper.updateByPrimaryKeySelective(example);
    }

    @Override
    public int add(Good example) {
        Good good = goodMapper.selectByPrimaryKey(example.getId());
        if(good==null){
            goodMapper.insert(example);
        }
        return 0;
    }

    @Override
    public Good findById(Integer Id) {
        return goodMapper.selectByPrimaryKey(Id);
    }

    @Override
    public int deleteById(Integer Id) {
        return goodMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<Good> searchByKeyAndValue(String key, String value) {
        List<Good> list = null;
        switch (key){
            case "id":
                list = new ArrayList<>();
                list.add(goodMapper.selectByPrimaryKey(Integer.parseInt(value)));
                break;
            case "name":
                list = goodMapper.selectByName(value);
                break;
            default:
        }
        return list;
    }
}
