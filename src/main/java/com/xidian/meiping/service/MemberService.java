package com.xidian.meiping.service;

import com.xidian.meiping.entity.Member;

import java.util.List;

public interface MemberService {
    int addMember(Member member);
    List<Member> getAllMember(int pageNum, int pageSize);

}
