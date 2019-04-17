package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.SellingLogMapper;
import com.xidian.meiping.entity.SellingLog;
import com.xidian.meiping.service.service.SellingLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellingLogServiceImpl implements SellingLogService {

    @Autowired
    private SellingLogMapper mapper;
    @Override
    public List<SellingLog> searchByDate(String date1, String date2,String memberId, String goodId, String operaterId) {
        Integer id = null;
        Integer opId = null;
        Integer memId = null;
        if(goodId!=null&&!goodId.equals(""))
            id = Integer.parseInt(goodId);
        if(operaterId!=null&&!operaterId.equals(""))
            opId = Integer.parseInt(operaterId);
        if(memberId!=null&&!memberId.equals(""))
            memId = Integer.parseInt(memberId);
        return mapper.searchByDate(date1,date2,memId,id,opId);
    }
    @Override
    public List<SellingLog> findAll() {
        return mapper.selectAll();
    }

    @Override
    public int update(SellingLog example) {
        return 0;
    }

    @Override
    public int add(SellingLog example) {
        return 0;
    }

    @Override
    public SellingLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<SellingLog> searchByKeyAndValue(String key, String value) {
        return null;
    }
}