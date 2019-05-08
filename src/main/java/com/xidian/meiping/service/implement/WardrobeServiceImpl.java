package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.dao.RendWardrobeLogMapper;
import com.xidian.meiping.dao.WardrobeMapper;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.entity.RendWardrobeLog;
import com.xidian.meiping.entity.Wardrobe;
import com.xidian.meiping.service.service.WardrobeService;
import com.xidian.meiping.util.CommonUtil;
import com.xidian.meiping.util.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WardrobeServiceImpl implements WardrobeService {
    @Autowired
    private WardrobeMapper wardrobeMapper;
    @Autowired
    private RendWardrobeLogMapper mapper;
    @Autowired
    private MemberMapper memberMapper;
    @Override
    public List<Wardrobe> findAll() {
        return wardrobeMapper.selectAll();
    }

    @Override
    public int update(Wardrobe wardrobe) {
        wardrobe.setStartTime(null);
        wardrobe.insertOrUpdate = true;
        return wardrobeMapper.updateByPrimaryKeySelective(wardrobe);
    }

    @Override
    public int add(Wardrobe wardrobe) {
        wardrobe.insertOrUpdate = true;
        //是否存在
        Wardrobe temp = wardrobeMapper.selectByPrimaryKey(wardrobe.getId());
//        System.out.println(temp.toString());
        if(temp==null) {
            wardrobe.setStartTime(null);
            return wardrobeMapper.insert(wardrobe);
        }
        return 0;
    }
    @Override
    public Wardrobe findById(Integer Id) {
        return wardrobeMapper.selectByPrimaryKey(Id);
    }

    @Override
    @Transactional
    public int deleteById(Integer Id) {
        Wardrobe wardrobe = wardrobeMapper.selectByPrimaryKey(Id);
        System.out.println(wardrobe);
        if(wardrobe.getStatus()== 1) return 0;
        try{
            return  wardrobeMapper.deleteByPrimaryKey(Id);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public List<Wardrobe> searchByKeyAndValue(String key, String value) {
        List<Wardrobe> list = null;
        switch (key){
            case "id":
                list = new ArrayList<>();
                list.add(wardrobeMapper.selectByPrimaryKey(Integer.parseInt(value)));
                break;
            case "name":
                list = wardrobeMapper.selectByName(value);
                break;
            case  "status":
                list = wardrobeMapper.selectByStatus(Integer.parseInt(value));
                break;
            case  "memberId":
                list = new ArrayList<>();
                list.add(wardrobeMapper.selectByMemberId(Integer.parseInt(value)));
                break;
            default:
        }

        return list;
    }

    @Override
    @Transactional
    public int rendWardrobe(HttpServletRequest request) {
        double totalAmount = Double.parseDouble(request.getParameter("totalAmount"));
        Wardrobe wardrobe = (Wardrobe) CommonUtil.newInstance(new Wardrobe(),request);
        wardrobe.insertOrUpdate = true;
        Member member = memberMapper.selectByPrimaryKey(wardrobe.getMemberId());
        member.insertOrUpdate = true;
        if(member.getBalance()<totalAmount){
            return StatusCode.BANLANCE_ERROR;
        }
        //修改会员余额
        member.setBalance(member.getBalance()-totalAmount);
        memberMapper.updateByPrimaryKeySelective(member);
        //修改衣柜
        wardrobeMapper.updateByMemberId(Integer.parseInt(request.getParameter("memberId")));
        //插入衣柜租用记录
        RendWardrobeLog log = new RendWardrobeLog();
        log.setOperateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date()));
        log.setEndTime(request.getParameter("endTime"));
        log.setStartTime(request.getParameter("startTime"));
        log.setMemberId(wardrobe.getMemberId());
        log.setWardrobeId(wardrobe.getId());
        log.setContext(request.getParameter("context"));
        log.setOperaterId(Integer.parseInt(request.getParameter("operaterId")));
        log.setTotalAmount(totalAmount);
        mapper.insert(log);
//        int id = mapper.selectByMemberIdAndWardrobeIdAndEndTime(log.getMemberId(),log.getWardrobeId(),log.getEndTime()).getId();
        wardrobe.setRendWardrobeLogId(log.getId());
        return wardrobeMapper.updateByPrimaryKeySelective(wardrobe);
    }

    @Override
    @Transactional
    public int rendWardrobeMore(HttpServletRequest request) {
        rendWardrobe(request);
        return 1;
    }

    @Override
    @Transactional
    public int returnWardrobe(HttpServletRequest request) {
        //get wardrobe
        Wardrobe wardrobe = wardrobeMapper.selectByPrimaryKey(Integer.parseInt(request.getParameter("id")));
        //get log
        RendWardrobeLog log = new RendWardrobeLog();
        log.setMemberId(wardrobe.getMemberId());
        log.setWardrobeId(wardrobe.getId());
        log.setStartTime(request.getParameter("startTime"));
        log.setOperaterId(Integer.parseInt(request.getParameter("operaterId")));
//        System.out.println("totalAmount:"+Double.parseDouble(request.getParameter("totalAmount")));
        log.setTotalAmount(Double.parseDouble(request.getParameter("totalAmount")));
        log.setContext(request.getParameter("context"));
        log.setOperateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date()));
        wardrobe.setMemberId(null);
        wardrobe.setRendWardrobeLogId(null);
        wardrobe.setStatus(0);
        wardrobe.setStartTime(null);
        return 1==wardrobeMapper.updateByPrimaryKey(wardrobe)&&
                1==mapper.insert(log)?1:0;
    }
}
