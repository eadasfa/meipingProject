package com.xidian.meiping.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "memberService")
public class MemberServiceIml implements MemberService {

    @Autowired
    private MemberMapper memberMapper;
    @Override
    public int addMember(Member member) {
        return memberMapper.insert(member);
    }

    @Override
    public PageInfo<Member> findAllMember(int pageNum, int pageSize) {
        //将参数传给这个方法就可以实现物理分页了，非常简单。
        PageHelper.startPage(pageNum, pageSize);
        List<Member> memberDomains = memberMapper.selectAllMember();
        PageInfo<Member> result = new PageInfo(memberDomains);
        return result;
    }
}
