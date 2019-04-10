package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.CardMapper;
import com.xidian.meiping.entity.Card;
import com.xidian.meiping.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cardService")
public class CardServiceImpl implements CardService {

    @Autowired
    private CardMapper cardMapper;

    @Override
    public List<Card> getAll() {
        return cardMapper.selectAllCards();
    }

    @Override
    public int update(Card card) {
        return cardMapper.updateByPrimaryKeySelective(card);
    }

    @Override
    public int add(Card card) {
        return cardMapper.insert(card);
    }

    @Override
    public Card selectById(Integer Id) {
        return cardMapper.selectByPrimaryKey(Id);
    }
    @Override
    public int deleteById(Integer Id) {
        return cardMapper.deleteByPrimaryKey(Id);
    }
}
