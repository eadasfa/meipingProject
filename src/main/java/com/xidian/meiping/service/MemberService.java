package com.xidian.meiping.service;

import com.github.pagehelper.PageInfo;
import com.xidian.meiping.entity.Member;

import java.util.List;

public interface MemberService {
    int addMember(Member member);
    PageInfo<Member> findAllMember(int pageNum, int pageSize);

}
