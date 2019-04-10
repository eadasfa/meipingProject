package com.xidian.meiping;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.builder.SpringApplicationBuilder;

import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@MapperScan("com.xidian.meiping.dao")//将项目中对应的mapper类的路径加进来就可以了
@SpringBootApplication
public class MeipingApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(MeipingApplication.class, args);
    }
    @Override//为了打包springboot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
