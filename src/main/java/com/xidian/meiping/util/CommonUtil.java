package com.xidian.meiping.util;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class CommonUtil {
    public static String upperFirst(String toUpper){
        return toUpper.substring(0, 1).toUpperCase()+ toUpper.substring(1);
    }
    public static Object newInstance(Object o, HttpServletRequest request){
        Class clazz  = o.getClass();
        Method[]methods = clazz.getMethods();
        Field[] field = clazz .getDeclaredFields();
        String temp = "";
        for(Field f:field){
            temp = request.getParameter(f.getName());
//            temp = temp==null?"0":temp.trim();
////            temp = temp.equals("")?"0":temp;
            if(temp!=null&&temp.equals("")) temp=null;
            String methodName = "set"+ CommonUtil.upperFirst(f.getName());
            Method method = null;
            for(Method m: methods){
                if(methodName.equals(m.getName())){
                    method = m;
                    break;
                }
            }
            Class[] parameterTypes = method.getParameterTypes();
//            System.out.println("methodName:"+methodName);
            if(parameterTypes!=null){
                try {
                    switch (parameterTypes[0].toString()){
                        case "class java.lang.Integer":
                            method.invoke(o,temp==null?null:Integer.parseInt(temp));
                            break;
                        case "class java.lang.Double":
                            method.invoke(o,temp==null?null:Double.parseDouble(temp));
                            break;
                        case "class java.lang.String":
                            method.invoke(o,temp+"");
                            break;
                        default:
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }
        return o;
    }
}
