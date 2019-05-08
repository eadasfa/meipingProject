package com.xidian.meiping.service.implement;

import com.xidian.meiping.dao.CardMapper;
import com.xidian.meiping.dao.MemberMapper;
import com.xidian.meiping.entity.Card;
import com.xidian.meiping.service.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("cardService")
public class CardServiceImpl implements CardService {

    @Autowired
    private CardMapper cardMapper;
    @Autowired
    private MemberMapper memberMapper;

    @Override
    public List<Card> findAll() {
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
    public Card findById(Integer Id) {
        return cardMapper.selectByPrimaryKey(Id);
    }
    @Override
    @Transactional
    public int deleteById(Integer Id) {
        if(memberMapper.selectByCardTypeId(Id).size()>0)
            return 0;
        return cardMapper.deleteByPrimaryKey(Id);
    }

    @Override
    public List<Card> searchByKeyAndValue(String key, String value) {
        return null;
    }
}
