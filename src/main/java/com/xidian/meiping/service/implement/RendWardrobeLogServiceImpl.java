package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.RendWardrobeLogMapper;
import com.xidian.meiping.entity.RendWardrobeLog;
import com.xidian.meiping.service.service.RendWardrobeLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RendWardrobeLogServiceImpl implements RendWardrobeLogService {
    @Autowired
    private RendWardrobeLogMapper mapper;

    @Override
    public List<RendWardrobeLog> searchByTheseKey(String from, String to, String memberId, String operaterId) {
        Integer memId = null;
        Integer opId = null;
        if(memberId!=null&&!memberId.trim().equals("")){
            memId = Integer.parseInt(memberId.trim());
        }
        if(operaterId!=null&&!operaterId.trim().equals("")){
            opId = Integer.parseInt(operaterId.trim());
        }
        return mapper.searchByTheseKey(from,to,memId,opId);
    }
    @Override
    public List<RendWardrobeLog> findAll() {
        return mapper.selectAll();
    }

    @Override
    public int update(RendWardrobeLog example) {
        return 0;
    }

    @Override
    public int add(RendWardrobeLog example) {
        return 0;
    }

    @Override
    public RendWardrobeLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<RendWardrobeLog> searchByKeyAndValue(String key, String value) {
        return null;
    }


}
