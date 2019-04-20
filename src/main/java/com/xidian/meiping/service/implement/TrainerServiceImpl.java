package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.TrainerMapper;
import com.xidian.meiping.entity.Trainer;
import com.xidian.meiping.service.service.MemberService;
import com.xidian.meiping.service.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainerServiceImpl implements TrainerService {
    @Autowired
    private TrainerMapper trainerMapper;
    @Autowired
    private MemberService memberService;
    @Override
    public List<Trainer> findAllWithMemberId() {
        return trainerMapper.selectAllWithMemberId();
    }

    @Override
    public List<Trainer> findAll() {
        return trainerMapper.selectAll();
    }

    @Override
    public int update(Trainer example) {
        return 0;
    }

    @Override
    public int add(Trainer example) {
        return 0;
    }

    @Override
    public Trainer findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<Trainer> searchByKeyAndValue(String key, String value) {
        return null;
    }

    public List<Trainer> searchByMemberIdAndTrainerId(String memberId, String trainerId) {
        Integer memId = null;
        Integer traId = null;
        if(!(memberId==null||memberId.trim().equals("")))
            memId = Integer.parseInt(memberId);
        if(!(trainerId==null||trainerId.trim().equals("")))
            traId = Integer.parseInt(trainerId);
        List<Trainer> list = trainerMapper.searchByMemberIdAndTrainerId(memId,traId);
        if(list==null||list.size()==0){
            list = new ArrayList<>();
            if(memId!=null){
                Trainer trainer = new Trainer();
                trainer.setMemberId(memId);
                trainer.setMemberName(memberService.findById(memId).getName());
                trainer.setDayNumber(null);
                list.add(trainer);
            }
        }
        return list;
    }
}
