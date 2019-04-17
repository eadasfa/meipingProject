package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.PositionMapper;
import com.xidian.meiping.entity.Position;
import com.xidian.meiping.service.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {
    @Autowired
    private PositionMapper positionMapper;
    @Override
    public List<Position> getAll() {
        return positionMapper.selectAll();
    }
}
