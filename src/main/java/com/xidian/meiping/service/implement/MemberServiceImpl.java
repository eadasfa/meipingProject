package com.xidian.meiping.service.implement;

import com.xidian.meiping.MeipingApplication;
import com.xidian.meiping.dao.*;
import com.xidian.meiping.entity.*;
import com.xidian.meiping.service.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service(value = "memberService")
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private TrainerMapper trainerMapper;
    @Autowired
    private WardrobeMapper wardrobeMapper;
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private MemberCardBuyLogMapper memberCardBuyLogMapper;
    @Autowired
    private RendWardrobeLogMapper rendWardrobeLogMapper;
    @Autowired
    private RendTrainerLogMapper rendTrainerLogMapper;
    @Autowired
    private SellingLogMapper sellingLogMapper;
    @Autowired
    private TopUpLogMapper topUpLogMapper;
    @Autowired
    private CardMapper cardMapper;
    @Override
    public List<Member> findAll() {
//        if(memberMapper==null)System.out.println("memberMapper is null");
//        else System.out.println("not null");
        List<Member> list = memberMapper.selectAll();
        for(Member member:list){
            setTrainerAndWardrobe(member);
        }
        return list;
    }

    @Override
    public int update(Member example) {
        return memberMapper.updateByPrimaryKeySelective(example);
    }
    public int updateTopUp(Member example) {
//        System.out.println(example);
        Member m = memberMapper.selectByPrimaryKey(example.getId());
//        if(m.getBalance()==null) m.setBalance(0.0);
//        System.out.println(m);
        TopUpLog topUpLog = new TopUpLog();
        topUpLog.setMemberId(example.getId());
        topUpLog.setOperaterId(example.getOperaterId());
        topUpLog.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date()));
        topUpLog.setMoney(example.getBalance()-m.getBalance());
        System.out.println(topUpLog);
        topUpLogMapper.insert(topUpLog);
        m.setBalance(example.getBalance());
        return memberMapper.updateByPrimaryKeySelective(m);
    }

    @Override
    @Transactional
    public int add(Member example) {
        example.setStatus("可用");
        MemberCardBuyLog log = new MemberCardBuyLog();
        Card card = cardMapper.selectByCardName(example.getCardTypeName());
        Integer cardId = card.getId();
        log.setCardId(cardId);
        log.setMemberId(example.getId());
        log.setOperaterId(example.getOperaterId());
        log.setPrice(card.getPrice());
        log.setAccount(1.0);
        log.setStartTime(example.getStartDate());
        log.setEndTime(example.getEndDate());
        return memberMapper.insert(example);
    }

    @Override
    public Member findById(Integer Id) {
        Member member = memberMapper.selectByPrimaryKey(Id);
        setTrainerAndWardrobe(member);
        return member;
    }

    @Override
    @Transactional
    public int deleteById(Integer Id) {
        Trainer trainer = trainerMapper.selectByMemberId(Id);
        if(trainer!=null) {
            trainer.setMemberId(0);
            trainer.setRendTrainerLogId(0);
            trainer.setStatus(0);
            trainerMapper.updateByPrimaryKeySelective(trainer);
        }
        Wardrobe wardrobe = wardrobeMapper.selectByMemberId(Id);
        if(wardrobe!=null){
            wardrobe.setStatus(0);
            wardrobe.setMemberId(0);
            wardrobe.setRendWardrobeLogId(0);
            wardrobeMapper.updateByPrimaryKeySelective(wardrobe);
        }
        rendTrainerLogMapper.deleteByMemberId(Id);
        rendWardrobeLogMapper.deleteByMemberId(Id);
        memberCardBuyLogMapper.deleteByMemberId(Id);
        sellingLogMapper.deleteByMemberId(Id);
        topUpLogMapper.deleteByMemberId(Id);
        return memberMapper.deleteByPrimaryKey(Id);
    }

    public List<Member> findByName(String name){
        List<Member> list = memberMapper.selectByName(name);
        for(Member member:list){
            setTrainerAndWardrobe(member);
        }
        return list;
    }
    @Override
    public List<Member> searchByKeyAndValue(String key, String value) {
        List<Member> list = null;
        switch (key){
            case "id":
                list = new ArrayList<>();
                list.add(findById(Integer.parseInt(value)));
                break;
            case "name":
                list = memberMapper.selectByName(value);
                break;
            default:
        }
        return list;
    }
    public void setTrainerAndWardrobe(Member member){
        if(member==null) return ;
        Trainer trainer = trainerMapper.selectByMemberId(member.getId());
        if(trainer!=null){
            Employee employee = employeeMapper.selectByPrimaryKey(trainer.getTrainerId());
            member.setTrainerName(employee.getName());
        }
        Wardrobe  wardrobe = wardrobeMapper.selectByMemberId(member.getId());
        if(wardrobe!=null){
            member.setWardrobeId(wardrobe.getId());
        }
    }
}
