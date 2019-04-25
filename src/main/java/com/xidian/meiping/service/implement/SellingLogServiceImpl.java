package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.GoodMapper;
import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.dao.SellingLogMapper;
import com.xidian.meiping.entity.Good;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.entity.SellingLog;
import com.xidian.meiping.service.service.SellingLogService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.ConstValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class SellingLogServiceImpl implements SellingLogService {

    @Autowired
    private SellingLogMapper mapper;
    @Autowired
    private GoodMapper goodMapper;
    @Autowired
    private MemberMapper memberMapper;
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
        return mapper.searchByDate(date1,date2,memId,id,opId,0);
    }

    @Override
    public List<SellingLog> searchByDate(HttpServletRequest request) {
        String from = request.getParameter("from");
        String to = request.getParameter("to");
        String goodId = request.getParameter("goodId");
        String operaterId = request.getParameter("operaterId");
        String memberId = request.getParameter("memberId");
        Integer id = null;
        Integer opId = null;
        Integer memId = null;
        if(goodId!=null&&!goodId.equals(""))
            id = Integer.parseInt(goodId);
        if(operaterId!=null&&!operaterId.equals(""))
            opId = Integer.parseInt(operaterId);
        if(memberId!=null&&!memberId.equals(""))
            memId = Integer.parseInt(memberId);
        String type = request.getParameter("type");
        if(!type.equals("1")) type=0+"";
        return mapper.searchByDate(from,to,memId,id,opId,Integer.parseInt(type));
    }

    @Override
    public List<SellingLog> findAll() {
        return findAll(0+"");
    }

    @Override
    public List<SellingLog> findAll(String type) {
        return mapper.selectAll(Integer.parseInt(type));
    }

    @Override
    @Transactional
    public SellingLog buyGood(HttpServletRequest request) {
        SellingLog log = (SellingLog) CommonUtil.newInstance(new SellingLog(),request);
        add(log);
        //更新商品库存
        Good good = new Good();
        good.setId(log.getGoodId());
        good.setLeftNumber(Integer.parseInt(request.getParameter("leftNumber")));
//        System.out.println(good);
        goodMapper.updateByPrimaryKeySelective(good);
        //更新member
        Member member = memberMapper.selectByPrimaryKey(log.getMemberId());
        if(log.getSellingType()==0){
            member.setBalance(member.getBalance()-log.getTotalAmount());
            member.setCredit(member.getCredit()+
                    (int)((log.getTotalAmount()+member.getTotalConsumption()% ConstValue.CREDIT_DIVISOR)/ConstValue.CREDIT_DIVISOR));
            member.setTotalConsumption(member.getTotalConsumption()+log.getTotalAmount());
        }
        else member.setCredit(member.getCredit()-(int)(log.getTotalAmount()/1));
        memberMapper.updateByPrimaryKey(member);
        return findById(log.getId());
    }

    @Override
    public int update(SellingLog example) {
        return 0;
    }

    @Override
    public int add(SellingLog example) {
        example.setId(null);
        example.setSellingTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date()));
        return mapper.insert(example);
    }

    @Override
    public SellingLog findById(Integer Id) {
        return mapper.selectByPrimaryKey(Id);
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
