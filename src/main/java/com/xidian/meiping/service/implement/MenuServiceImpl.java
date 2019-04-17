package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.MenuMapper;
import com.xidian.meiping.entity.Menu;
import com.xidian.meiping.service.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value="menuService")
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Override
    public List<Menu> getAllMenu() {
        return menuMapper.selectAll();
    }

}
