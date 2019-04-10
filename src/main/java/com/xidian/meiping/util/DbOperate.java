package com.xidian.meiping.util;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

/**
 * @Author: cxx
 * 数据库备份与还原
 * @Date: 2018/4/28 19:56
 */
public class DbOperate {
    //当前是否自动备份
    private static boolean isAutoBackup = false;
    //自动备份间隔时间
    public static double gapHours = 10;
    //是否删除上一个备份文件
    private static boolean deleteLastBackupfile = true;
    private static String serverUrl="localhost";
    private static String path = "";
    private static String backName = "";
    private final static String user = "root";
    private final static String password = "123456";
    private static boolean isWindows;
    //自动备份线程
    private static AutoBackupThread autoBackupThread = null;
    static {
        try {
            File file = new File("");
            String filePath = file.getCanonicalPath();
            filePath = filePath.replace("\\","/");
            int t = filePath.lastIndexOf('/');
            path = filePath.substring(0,t)+"/";
            isWindows = getOSName().equals("windows");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * 备份数据库db
     * @param root
     * @param pwd
     * @param dbName
     * @param backPath
     * @param backName
     */
    public static Boolean dbBackUp(String root,String pwd,String dbName,String backPath,String backName) throws Exception {
        String pathSql = backPath+backName;
        File fileSql = new File(pathSql);
        //创建备份sql文件
        if (!fileSql.exists()){
            fileSql.createNewFile();
        }
        //mysqldump -hlocalhost -uroot -p123456 db > /home/back.sql
        System.out.println("开始备份！");
        if(!exc("mysqldump",root,pwd,dbName,pathSql)){
            System.out.println("备份失败！");
            return false;
        }
        System.out.println("备份成功!");
        //删除原文件
        if(deleteLastBackupfile&&!(DbOperate.backName.equals("")||DbOperate.backName==null) )
            deleteFile(backPath+DbOperate.backName);
        DbOperate.backName = backName;
        return true;
    }
    public static synchronized boolean dbBackUp() throws Exception{
        String backName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss")
                .format(new Date())+".sql";
        return dbBackUp("root","123456","meiping",path,backName);
    }
    /**
     * 恢复数据库
     * @param root
     * @param pwd
     * @param dbName
     * @param filePath
     * mysql -hlocalhost -uroot -p123456 db < /home/back.sql
     */
    public static boolean dbRestore(String root,String pwd,String dbName,String filePath) throws Exception{

        System.out.println("开始还原！");
        if(!exc("mysql",root,pwd,dbName,filePath)){
            System.out.println("恢复失败！");
            return false;
        }
        System.out.println("还原成功！");
        return true;
    }
    public static boolean dbRestore() throws Exception{
        if(backName.equals("")||backName==null) return false;
        boolean temp = isAutoBackup();
        if(temp) stopAutoBackup();//如果当前是自动备份，则停止
        Thread.sleep(2000);
        boolean flag = dbRestore(user,password,"meiping",path+backName);
        if(temp) startAutoBackup();//如果在恢复数据前是自动备份，恢复自动备份
        return flag;
    }

    public static void main(String[] args) throws Exception {

//        Properties props = System.getProperties();
//        System.out.println("操作系统的名称：" + props.getProperty("os.name"));
//        String path = "C:/Users/Administrator/Desktop/temp/";
//        DbOperate.dbBackUp("root","123456","meiping",path,backName);
//        dbRestore("root","123456","meiping", "C:/Users/Administrator/Desktop/temp/2019-04-08-23-05-20.sql");
//        DbOperate.dbBackUp();
//        DbOperate.dbRestore();
//        Thread.sleep(1000);
//        DbOperate.dbBackUp();
        DbOperate.startAutoBackup(0.002778);
        new Thread(()->{
            try {
                Thread.sleep(35*1000);
                DbOperate.startAutoBackup(0.001389);
                Thread.sleep(20*1000);
                DbOperate.stopAutoBackup();
                DbOperate.startAutoBackup(0.001389);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

    }
    /**
     * 删除单个文件
     *
     * @param fileName
     *            要删除的文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
            return false;
        }
    }
    private static String getCommand(){

        if(isWindows)
            return "cmd /c ";
        return "sh -c ";
    }
    private static String getOSName(){
        Properties props = System.getProperties();
        String os = props.getProperty("os.name").toLowerCase();
        System.out.println("getOSName():操作系统:"+os);
        if(os.contains("windows"))
            return "windows";
        return "linux";
    }
    public static boolean isAutoBackup(){
        return isAutoBackup ;
    }
    public static boolean startAutoBackup(){
        return startAutoBackup(gapHours);
    }
    public static boolean startAutoBackup(double gapHours){
        DbOperate.gapHours = gapHours;
        if(!isAutoBackup()){
            System.out.println("正在启动自动备份");
            isAutoBackup = true;
            autoBackupThread = new AutoBackupThread();
            autoBackupThread.start();
        }else{
            System.out.println("正在改变自动备份时间间隔");
            synchronized (autoBackupThread){
                autoBackupThread.notify();
            }
        }
        return true;
    }
    public static boolean stopAutoBackup(){
        if(!isAutoBackup()) return true;
        isAutoBackup = false;
        System.out.println("正在停止自动备份");
        synchronized (autoBackupThread){
            autoBackupThread.notify();
        }
        return true;
    }

    private static boolean exc(String commond,String root,String pwd,
       String dbName,String filePath) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append(commond);
        sb.append(" -h"+serverUrl);
        if(isWindows){
            sb.append(" -u"+root);
            sb.append(" -p"+pwd);
        }
        if (commond.equals("mysql"))
            sb.append(" "+dbName+" <");
        else sb.append(" "+dbName+" >");
        sb.append(filePath);
        System.out.println("命令为："+sb.toString());
        Runtime runtime = Runtime.getRuntime();
        Process process = null;
        if(!isWindows) {
            process = runtime.exec("/bin/bash", null, new File("/bin"));
            if(process==null) return false;
            PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(process.getOutputStream())), true);
            out.println(sb.toString());
            if(out!=null) out.println("exit");
        }
        else {
            process = runtime.exec(getCommand()+sb.toString());
        }
        return 0==process.waitFor();
    }
}
class AutoBackupThread extends Thread{
    public AutoBackupThread(){
        setName("Auto-Backup.Thread");
    }
    @Override
    public void run(){
        while (DbOperate.isAutoBackup()){
            try {
                synchronized (this){
                    wait((int)(DbOperate.gapHours*3600*1000));
                    DbOperate.dbBackUp();
                }
            }catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}