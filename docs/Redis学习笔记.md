# Redis学习笔记
## 1.安装
1.tcl依赖包:
```bash
wget https://sourceforge.net/projects/tcl/tcl8610-src.zip

unzip tcl8610-src.zip

sudo mv tcl8.6.10  /usr/local/tcl

cd /usr/local/tcl/unix/

sudo ./configure

sudo make 

sudo make install
```

2.redis包:  
```
wget http://download.redis.io/releases/redis-5.0.7.tar.gz

tar -zxvf redis-5.0.7.tar.gz

sudo mv redis-5.0.7  /usr/local/redis

cd /usr/local/redis

sudo make

sudo make test

sudo make install
```

3.配置
```
cd /usr/local/redis/

mkdir bin

mkdir etc

mv redis.conf /usr/local/redis/etc/

cd src

mv mkreleasehdr.sh redis-benchmark redis-check-aof redis-check-rdb redis-cli redis-sentinel  redis-server redis-trib.rb /usr/local/redis/bin/
```

配置文件 redis.conf
(1) 注释掉 bind 127.0.0.1 这一行（解决只能特定网段连接的限制）
(2) 将 protected-mode 属性改为 no （关闭保护模式，不然会阻止远程访问）
(3) 将 daemonize 属性改为 yes （这样启动时就在后台启动）
(4) requirepass 密码 设置密码（可选，个人建议还是设个密码）



4.启动
```
cd /usr/local/redis/

./bin/redis-server /usr/local/redis/etc/redis.conf

ps -ef | grep redis
```

5.设置开机启动(service 方式管理)
```
cp /usr/local/redis/utils/redis_init_script /etc/init.d/redis

修改redis文件
#!/bin/sh
# chkconfig: 2345 10 90
# description: Start and Stop redis

# Simple Redis init.d script conceived to work on Linux systems
# as it does use of the /proc filesystem.

REDISPORT=6379
EXEC=/usr/local/redis/bin/redis-server
CLIEXEC=/usr/local/redis/bin/redis-cli

PIDFILE=/var/run/redis_${REDISPORT}.pid
CONF="/usr/local/redis/etc/redis.conf"

添加redis服务：
[redis开机自启动方法](https://www.cnblogs.com/mr-wuxiansheng/p/12494124.html)
```

6.window 下设置开机自启动，添加server服务  
cmd 到 redis 安装路径下
```cmd
redis-server --service-install redis.windows-service.conf --loglevel verbose
```

6.下载Redis客户端工具 `RedisDesktopManager`