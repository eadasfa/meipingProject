package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.BuyingLogMapper;
import com.xidian.meiping.dao.GoodMapper;
import com.xidian.meiping.entity.BuyingLog;
import com.xidian.meiping.entity.Good;
import com.xidian.meiping.service.service.BuyingLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BuyingLogServiceImpl implements BuyingLogService {
    @Autowired
    private BuyingLogMapper mapper;
    @Autowired
    private GoodMapper goodMapper;

    @Override
    public List<BuyingLog> findAll() {
        return mapper.selectAll();
    }

    @Override
    public int update(BuyingLog example) {
        return 0;
    }

    @Override
    @Transactional
    public int add(BuyingLog example) {
        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date());
        example.setBuyingTime(date);
        mapper.insert(example);
        Good good = goodMapper.selectByPrimaryKey(example.getGoodId());
        good.setLeftNumber(good.getLeftNumber()+example.getNumber());
        goodMapper.updateByPrimaryKeySelective(good);
        return 1;
    }

    @Override
    public BuyingLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<BuyingLog> searchByKeyAndValue(String key, String value) {
        return null;
    }

    public List<BuyingLog> searchByDate(String date1,String date2,String memberId, String goodId,String operaterId){
        Integer id = null;
        Integer opId = null;
        if(goodId!=null&&!goodId.equals(""))
            id = Integer.parseInt(goodId);
        if(operaterId!=null&&!operaterId.equals(""))
            opId = Integer.parseInt(operaterId);
        return mapper.searchByDate(date1,date2,null,id,opId);
    }

//    public static void main(String[] args){
//        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                .format(new Date());
//        System.out.println(date);
//    }
}
