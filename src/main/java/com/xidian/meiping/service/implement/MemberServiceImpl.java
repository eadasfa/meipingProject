package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.entity.Member;
import com.xidian.meiping.service.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "memberService")
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public List<Member> findAll() {
        //将参数传给这个方法就可以实现物理分页了，非常简单。
//        PageHelper.startPage(pageNum, pageSize);
//        List<Member> memberDomains = memberMapper.selectAllMember();
//        PageInfo<Member> result = new PageInfo(memberDomains);
        return memberMapper.selectAll();
    }

    @Override
    public int update(Member example) {
        return 0;
    }

    @Override
    public int add(Member example) {
        return 0;
    }

    @Override
    public Member findById(Integer Id) {
        return null;
    }

    @Override
    public int deleteById(Integer Id) {
        return 0;
    }

    @Override
    public List<Member> searchByKeyAndValue(String key, String value) {
        return null;
    }
}
