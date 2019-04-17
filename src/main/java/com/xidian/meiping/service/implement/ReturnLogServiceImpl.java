package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.GoodMapper;
import com.xidian.meiping.dao.ReturnLogMapper;
import com.xidian.meiping.entity.Good;
import com.xidian.meiping.entity.ReturnLog;
import com.xidian.meiping.service.service.ReturnLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ReturnLogServiceImpl implements ReturnLogService {
    @Autowired
    private GoodMapper goodMapper;
    @Autowired
    private ReturnLogMapper mapper;
    @Override
    public List<ReturnLog> findAll() {
        return null;
    }

    @Override
    public int update(ReturnLog example) {
        return 0;
    }

    @Override
    public int add(ReturnLog example) {
        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date());
        example.setReturnTime(date);
        mapper.insert(example);
        Good good = goodMapper.selectByPrimaryKey(example.getGoodId());
        good.setLeftNumber(good.getLeftNumber()-example.getReturnNumber());
        goodMapper.updateByPrimaryKeySelective(good);
        return 1;
    }

    @Override
    public ReturnLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<ReturnLog> searchByKeyAndValue(String key, String value) {
        return null;
    }

    @Override
    public List<ReturnLog> searchByDate(String date1, String date2, String memberId, String goodId, String operaterId) {
        return null;
    }
}
