package com.xidian.meiping;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@MapperScan("com.xidian.meiping.dao")//将项目中对应的mapper类的路径加进来就可以了
@SpringBootApplication
public class MeipingApplication {

    public static void main(String[] args) {
        System.out.println();
        SpringApplication.run(MeipingApplication.class, args);
    }

}
