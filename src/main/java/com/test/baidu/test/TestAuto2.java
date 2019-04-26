package com.test.baidu.test;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;


/**
 * mybatis-plus代码生成工具
 * @author dell
 *
 */

public class TestAuto2 {
	
    private static void generateByTables(String url,boolean serviceNameStartWithI, String packageName, String... tableNames) {
        GlobalConfig config = new GlobalConfig();  // 全局配置
        
        config.setActiveRecord(false)	// 不需要ActiveRecord特性的请改为false
		        .setAuthor("fyc")   //作者
		        .setOutputDir("E:\\1test")  //输出路径
		        .setFileOverride(true);
        
       
        
        // 自定义文件命名，注意 %s 会自动填充表实体属性！
        // config.setMapperName("%sDao");
        // config.setXmlName("%sDao");
        // config.setServiceName("MP%sService");
        // config.setServiceImplName("%sServiceDiy");
        // config.setControllerName("%sAction");
        
        String dbUrl = url;
        
        DataSourceConfig dataSourceConfig = new DataSourceConfig();// 数据源配置
        
        dataSourceConfig.setDbType(DbType.SQL_SERVER)  //数据库类型
                .setUrl(dbUrl)					  //地址
                .setUsername("sa")			  //登录用户
                .setPassword("sa")				  //密码
                .setDriverName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); //使用驱动
        		
        
        StrategyConfig strategyConfig = new StrategyConfig(); // 策略配置
        strategyConfig
                .setCapitalMode(true)   // 全局大写命名 ORACLE 注意
                .setEntityLombokModel(false)
                .setDbColumnUnderline(true)
                .setNaming(NamingStrategy.underline_to_camel)
                .setInclude(tableNames);//修改替换成你需要的表名，多个表名传数组
        
        // strategy.setInclude(new String[] { "user" }); // 需要生成的表
        // strategy.setExclude(new String[]{"test"}); // 排除生成的表
        // 自定义实体父类
        // strategy.setSuperEntityClass("com.baomidou.demo.TestEntity");
        // 自定义实体，公共字段
        // strategy.setSuperEntityColumns(new String[] { "test_id", "age" });
        // 自定义 mapper 父类
        // strategy.setSuperMapperClass("com.baomidou.demo.TestMapper");
        // 自定义 service 父类
        // strategy.setSuperServiceClass("com.baomidou.demo.TestService");
        // 自定义 service 实现类父类
        // strategy.setSuperServiceImplClass("com.baomidou.demo.TestServiceImpl");
        // 自定义 controller 父类
        // strategy.setSuperControllerClass("com.baomidou.demo.TestController");
        // 【实体】是否生成字段常量（默认 false）
        // public static final String ID = "test_id";
        // strategy.setEntityColumnConstant(true);
        // 【实体】是否为构建者模型（默认 false）
        // public User setName(String name) {this.name = name; return this;}
        // strategy.setEntityBuilderModel(true);
        
        if (!serviceNameStartWithI) {  //是否在生成的接口前面加上I
            config.setServiceName("%sService");
        }
        new AutoGenerator()
        		.setGlobalConfig(config)
                .setDataSource(dataSourceConfig)
                .setStrategy(strategyConfig)
                .setPackageInfo(
                        new PackageConfig()
                                .setParent(packageName)
                                .setController("controller")
                                .setEntity("entity")
                ).execute();
    }

    
    @SuppressWarnings("unused")
	private void generateByTables(String packageName, String... tableNames) {
        generateByTables("jdbc:sqlserver://127.0.0.1:1433;DatabaseName=cbsPemBusiness",true, packageName, tableNames);
    }

    
    
    public static void main(String[] args) {
        String packageName = "com.test.baidu";
        boolean serviceNameStartWithI = true;//user -> UserService, 设置成true: user -> IUserService
        generateByTables("jdbc:sqlserver://127.0.0.1:1433;DatabaseName=EXTbank",serviceNameStartWithI, packageName, "baidumap_user");

	}

}
