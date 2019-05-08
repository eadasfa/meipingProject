package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.dao.RendTrainerLogMapper;
import com.xidian.meiping.dao.TrainerMapper;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.entity.RendTrainerLog;
import com.xidian.meiping.entity.Trainer;
import com.xidian.meiping.service.service.RendTrainerLogService;
import com.xidian.meiping.util.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class RendTrainerLogServiceImpl implements RendTrainerLogService {
    @Autowired
    private RendTrainerLogMapper mapper;
    @Autowired
    private TrainerMapper trainerMapper;
    @Autowired
    private MemberMapper memberMapper;
    @Override
    public List<RendTrainerLog> findByMemberId(String memberId) {
        Integer memId = Integer.parseInt(memberId);
        return mapper.selectByMemberId(memId);
    }
    @Override
    @Transactional
    public int add(RendTrainerLog example) {
        example.setId(null);
        Trainer trainer = trainerMapper.selectByPrimaryKey(example.getTrainerId());
        Member member = memberMapper.selectByPrimaryKey(example.getMemberId());
        trainer.insertOrUpdate = true;
        member.insertOrUpdate = true;
        //当前余额不足
        if(member.getBalance()<example.getTotalAmount()){
            return StatusCode.BANLANCE_ERROR;
        }
        //修改余额
        member.setBalance(member.getBalance()-example.getTotalAmount());
        memberMapper.updateByPrimaryKeySelective(member);
        //修改教练
        trainerMapper.updateByMemberId(example.getMemberId());
        //插入记录
        mapper.insert(example);
        trainer.setStatus(1);
        trainer.setMemberId(example.getMemberId());
        trainer.setRendTrainerLogId(example.getId());
        System.out.println(trainer);
        return trainerMapper.updateByPrimaryKeySelective(trainer);
    }
    @Override
    public List<RendTrainerLog> findAll() {
        return null;
    }

    @Override
    public int update(RendTrainerLog example) {
        return 0;
    }

    @Override
    public RendTrainerLog findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<RendTrainerLog> searchByKeyAndValue(String key, String value) {
        return null;
    }
}
