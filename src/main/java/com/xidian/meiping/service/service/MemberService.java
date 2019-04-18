package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.Member;

public interface MemberService extends OperateBaseService<Member>{
    int updateTopUp(Member example);
}
