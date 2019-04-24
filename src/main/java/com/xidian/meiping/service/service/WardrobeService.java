package com.xidian.meiping.service.service;

import com.xidian.meiping.entity.Wardrobe;

import javax.servlet.http.HttpServletRequest;

public interface WardrobeService extends OperateBaseService<Wardrobe>{
    int rendWardrobe(HttpServletRequest request);
    int rendWardrobeMore(HttpServletRequest request);

    int returnWardrobe(HttpServletRequest request);
}
