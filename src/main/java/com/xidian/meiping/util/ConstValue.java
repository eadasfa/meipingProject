package com.xidian.meiping.util;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;

public final class ConstValue {
    public static final String ADD = "1";//添加
    public static final String UPDATE = "2";//修改
    public static final String DELETE = "3";//删除
    public static final String ADDMANY = "4";//添加多个衣柜
    public static final String SEARCH = "5";//查询
    public static final String CHECK_IN = "6";//进货
    public static final String RETURN_GOODS = "7";//退货
    public static final String TOP_UP = "8";//充值
    public static final String SEARCH_TRAINER_LOG = "9";//查询租用私教记录
    public static final String REND_TRAINER = "10";//租用私教
    public static final String SEARCH_SELLING_LOG="11";//查询商品销售记录
    public static final String SEARCH_TRAINER_BY_ID = "12";//通过trainerId查询Trainer
    public static final String REND_WARDROBE = "13";//租用衣柜
    public static final String REND_WARDROBE_MORE = "14";//衣柜续费
    public static final String RETURN_WARDROBE = "15";//归还衣柜
    public static final String SEARCH_WARDROBE_LOG = "16";//查询衣柜租用记录
    public static final String BUY_GOODS = "17";//购买商品
    public static final String FIND_BY_ID = "18";//购买商品
    public static final String LEAVE = "19";//请假
    public static final String BACK = "20";//销假
    public static final int CREDIT_DIVISOR=10;//积分兑换比例

    public static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

    //    public static final String ADD = "add";//添加
//    public static final String UPDATE = "update";//修改
//    public static final String DELETE = "delete";//删除
//    public static final String ADDMANY = "addMany";//添加多个衣柜
//    public static final String SEARCH = "search";//查询
//    public static final String CHECK_IN = "check in";//进货
//    public static final String RETURN_GOODS = "Return of the goods";//退货
//    public static final String TOP_UP = "top up";//充值
//    public static final String SEARCH_TRAINER_LOG = "SEARCH_TRAINER_LOG";//查询租用私教记录
//    public static final String REND_TRAINER = "REND_TRAINER";//租用私教
//    public static final String SEARCH_SELLING_LOG="SEARCH_SELLING_LOG";//查询商品销售记录
//    public static final String SEARCH_TRAINER_BY_ID = "SEARCH_TRAINER_BY_ID";//通过trainerId查询Trainer
//    public static final String REND_WARDROBE = "REND_WARDROBE";//租用衣柜
//    public static final String REND_WARDROBE_MORE = "REND_WARDROBE_MORE";//衣柜续费
//    public static final String RETURN_WARDROBE = "RETURN_WARDROBE";//归还衣柜
//    public static final String SEARCH_WARDROBE_LOG = "SEARCH_WARDROBE_LOG";//查询衣柜租用记录
//    public static final String BUY_GOODS = "BUY_GOODS";//购买商品
}
