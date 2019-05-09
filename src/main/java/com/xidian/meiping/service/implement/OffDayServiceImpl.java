package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.OffDayMapper;
import com.xidian.meiping.entity.OffDay;
import com.xidian.meiping.service.service.OffDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@Service
public class OffDayServiceImpl implements OffDayService {
    @Autowired
    private OffDayMapper offDayMapper;
    @Override
    public List<OffDay> seachByDate(HttpServletRequest request) {
        String from = request.getParameter("from");
        String to = request.getParameter("to");
        String memberId = request.getParameter("memberId");
        Integer memId = null;
        if(memberId!=null&&!memberId.equals("")){
            memId = Integer.parseInt(memberId);
        }
        List<OffDay> list = offDayMapper.selectByDate(from,to,memId);
        System.out.println(list.size());
        for (OffDay d:list){
            System.out.println(d);
        }
        return list;
    }

    @Override
    public List<OffDay> findAll() {
        return offDayMapper.selectAll();
    }

    @Override
    public int update(OffDay example) {
        return 0;
    }

    @Override
    public int add(OffDay example) {
        example.setOperateTime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date()));
        return offDayMapper.insert(example);
    }

    @Override
    public OffDay findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return offDayMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<OffDay> searchByKeyAndValue(String key, String value) {
        return null;
    }
}
