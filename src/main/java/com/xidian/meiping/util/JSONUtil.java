package com.xidian.meiping.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class JSONUtil {
    public static String ObjecttoJson(Object o,boolean success,String context){
        List list = new ArrayList();
        list.add(o);
        return toJsonString(list,success,context);
    }
    public static String toJsonString(List list,boolean success,String context){
        net.sf.json.JSONArray jsonArray = net.sf.json.JSONArray.fromObject(list);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success",success);
        jsonObject.put("context",context);
        jsonObject.put("data",jsonArray.toString());
        System.out.println(jsonArray.toString());
        net.sf.json.JSONArray returnResult = new JSONArray();
        returnResult.add(jsonObject);
        return returnResult.toString();
    }
}
