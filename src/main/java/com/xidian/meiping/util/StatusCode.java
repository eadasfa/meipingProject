package com.xidian.meiping.util;

public class StatusCode {
    public static final int ERROR = 0;
    public static final int RIGHT = 1;
    public static final int BANLANCE_ERROR=2;
    public static StringBuilder setContext(int statusCode,String operateCode,StringBuilder context){
        if(context==null) context = new StringBuilder("");
        switch (statusCode){
            case ERROR:
                context.append("失败");
                break;
            case RIGHT:
                break;
            case  BANLANCE_ERROR:
                context.append("余额不足!");
                break;
            default:
        }
        return context;
    }
}
