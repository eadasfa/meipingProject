package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.WardrobeMapper;
import com.xidian.meiping.entity.Wardrobe;
import com.xidian.meiping.service.WardrobeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardrobeServiceImpl implements WardrobeService {

    @Autowired
    private WardrobeMapper wardrobeMapper;

    @Override
    public List<Wardrobe> getAll() {
        return wardrobeMapper.selectAll();
    }

    @Override
    public int update(Wardrobe wardrobe) {
        return wardrobeMapper.updateByPrimaryKeySelective(wardrobe);
    }

    @Override
    public int add(Wardrobe wardrobe) {
        //是否存在
        Wardrobe temp = wardrobeMapper.selectByPrimaryKey(wardrobe.getId());
//        System.out.println(temp.toString());
        if(temp==null)
            return wardrobeMapper.insert(wardrobe);
        return 0;
    }

    @Override
    public Wardrobe selectById(Integer Id) {
        return wardrobeMapper.selectByPrimaryKey(Id);
    }

    @Override
    public int deleteById(Integer Id) {
        return wardrobeMapper.deleteByPrimaryKey(Id);
    }
}
