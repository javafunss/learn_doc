## Mysql 安装配置
1.安装
```
1.下载安装包

 wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.10-1_all.deb

 sudo dpkg -i mysql-apt-config_0.8.10-1_all.deb

 删除过期签名
 sudo apt-key del dsa1024

 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80  --recv-keys 8C718D3B5072E1F5

 apt-get update
 sudo apt install mysql-server


2.添加组和用户
groupadd mysql

useradd -r -g mysql mysql

cd /usr/local/

chown -R mysql:mysql mysql

3.初始化数据库
cd /usr/local/mysql
mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data 
```

2. 用户及常用初始化sql  
第一步：输入以下指令 vim /etc/my.cnf
第二步：在[mysqld] 下加命令行skip-grant-tables，然后保存退出，退出方法为先按Esc，然后再输入:wq
第三步：重启mysql，重启命令为service mysqld restart;
第四步：输入mysql -u root -p ，在输入密码的地方直接按Enter键
第五步：输入flush privileges命令
第六步：输入use mysql以及select user,host from user;命令用来确认root的host是哪个
第七步：输入修改密码的指令alter user'root'@'%' IDENTIFIED BY 'MyNewPass@666'; 
第八步：修改用户表的root账号host为%：UPDATE user SET `Host` = '%' WHERE `User` = 'root' LIMIT 1;

8.0 之前版本修改密码 
```
SET PASSWORD=PASSWORD('修改的密码') 
``` 
8.0 之后版本(mysql_native_password)修改密码
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

8.0 之后版本(caching_sha2_password)修改密码 
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'password';
```

普通添加用户方式
```
use mysql;
insert into user (host, user, password, select_priv, insert_priv, update_priv) 
 VALUES ('localhost', 'crm', PASSWORD('123'), 'Y', 'Y', 'Y');
flush privileges;
```
5.7版本：

```mysql
use mysql;
create user 'username'@'%' identified by '123456';

flush privileges;

```

8.0之后版本：
```
use mysql;
create user 'crm'@'%' identified with mysql_native_password by 'crm1234';

grant all on *.* to 'crm'@'%';
flush privileges;

```
添加用户并赋予权限 
```
grant all on *.* to 'crm'@'%' IDENTIFIED BY '密码';
```

查看用户权限 `show grants for 'xxx'@'%' `

## Mysql 常用sql
查询端口：  `show global variables like 'port';`

## Mysql 配置优化

## Mysql 常见问题总结:
### 时区问题
Msql系统时区，时间显示问题:
1.配置数据库：
设置全局时区：set global time_zone='+8:00
永久生效：
// 配置的位置，无论5.7还是8.x版本，都必须配在 [mysqld] 下面
[mysqld]
default-time-zone=+08:00
character-set-server=utf8mb4

2.JDBC连接
url: jdbc:mysql://${zlt.datasource.ip}:20036/learning_machine?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull

暂时可以不用：
3.json转换，Springboot默认使用JsonFormat，会将时间转换为UTC，需要配置：
@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
