package com.xidian.meiping.controller.systemSettingController;
import com.xidian.meiping.util.DbOperate;
import com.xidian.meiping.util.JSONUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/systemSetting")
public class BackupAndRestoreController {
    @ResponseBody
    @RequestMapping(value="/backupandrestore/operate",produces = "text/html;charset=UTF-8")
    public String Operate(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        String operateId = request.getParameter("operateId");
        boolean flag = true;
        String context = "";
        switch (operateId){
            case "isAutoBackup":
                flag = DbOperate.isAutoBackup();
                context = DbOperate.gapHours+"";
                break;
            case "backup":
                flag = DbOperate.dbBackUp();
                break;
            case "autoBackup":
                flag = DbOperate.startAutoBackup(Double.parseDouble(request.getParameter("gapHours")));
                break;
            case "stopAutoBackup":
                flag = DbOperate.stopAutoBackup();
                break;
            case "restoreDB":
                flag = DbOperate.dbRestore();
                context = "当前没有备份文件";
                break;
            default:
        }
        System.out.println("isAutoBackup:"+flag);
        return JSONUtil.ObjecttoJson(null,flag,context);
    }
}
