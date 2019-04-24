package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.RendWardrobeLog;

import java.util.List;

public interface RendWardrobeLogService extends OperateBaseService<RendWardrobeLog> {
    List<RendWardrobeLog> searchByTheseKey(String from,String to,String memberId,String operaterId);
}
