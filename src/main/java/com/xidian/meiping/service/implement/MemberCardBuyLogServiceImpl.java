package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.MemberCardBuyLogMapper;
import com.xidian.meiping.entity.MemberCardBuyLog;
import com.xidian.meiping.service.service.MemberCardBuyLogService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberCardBuyLogServiceImpl implements MemberCardBuyLogService {
    @Autowired
    private MemberCardBuyLogMapper mapper;
    @Override
    public List<MemberCardBuyLog> findAll() {
        return mapper.selectAll();
    }

    @Override
    public int update(MemberCardBuyLog example) {
        return 0;
    }

    @Override
    public int add(MemberCardBuyLog example) {
        return 0;
    }

    @Override
    public MemberCardBuyLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<MemberCardBuyLog> searchByKeyAndValue(String key, String value) {
        return null;
    }

    @Override
    public List<MemberCardBuyLog> searchByDate(String date1, String date2, String memberId, String goodId, String operaterId) {
        Integer memId = null;
        Integer opId = null;
        if(memberId!=null&&!memberId.equals(""))
            memId = Integer.parseInt(memberId);
        if(operaterId!=null&&!operaterId.equals(""))
            opId = Integer.parseInt(operaterId);
        return mapper.searchByDate(date1,date2,memId,opId);
    }
}
