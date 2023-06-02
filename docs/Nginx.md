## 安装配置
下载安装包 `http://nginx.org/en/download.html`
安装必要的库
```bash
yum -y install gcc
yum -y install gcc-c++
yum -y install pcre-devel openssl openssl-devel
```
安装：
```bash
./configure #自动配置

make #执行make命令

make install #执行make install 

whereis nginx #查看安装目录/usr/local/nginx

cd /usr/local/nginx/sbin 

./nginx #启动nginx 访问ip:80/
```

Ngix 默认目录：
```bash
  nginx path prefix: "/usr/local/nginx"
  nginx binary file: "/usr/local/nginx/sbin/nginx"
  nginx modules path: "/usr/local/nginx/modules"
  nginx configuration prefix: "/usr/local/nginx/conf"
  nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
  nginx pid file: "/usr/local/nginx/logs/nginx.pid"
  nginx error log file: "/usr/local/nginx/logs/error.log"
  nginx http access log file: "/usr/local/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```
Nginx 启动：
```bash
cd /usr/loca/nginx/sbin
./nginx -s stop		#停止nginx
./nginx	-s quit		#安全退出
./nginx -s reload	#修改了文件之后重新加载该程序文件
ps aux|grep nginx	#查看nginx进程
```

