# Linux 常用命令总结
递归删除指定文件：
```bash
find . -name '*.*' -type f -print -exec rm -rf {} \;
. 表示从当前目录开始递归查找
-name '.' 根据名称来查找，要查找所有以 .* 结尾的文件夹或文件
-type f 查找的类型为文件
-print 输出查找的文件目录名
-exec 后跟一个所要执行的命令，表示将 find 出来的文件或目录执行该命令
```

# Linux 环境配置
# 查看ubuntu的Codename，替换阿里源
lsb_release -a | grep Codename | awk '{print $2}' # 输出结果为下文中的Codename

deb http://mirrors.aliyun.com/ubuntu/ jammy main multiverse restricted universe
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main multiverse restricted universe
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main multiverse restricted universe
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main multiverse restricted universe
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main multiverse restricted universe
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main multiverse restricted universe
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main multiverse restricted universe
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main multiverse restricted universe
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main multiverse restricted universe
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main multiverse restricted universe

# 宝塔面板
外网面板地址: https://120.229.21.244:35914/5f0e2116
内网面板地址: https://172.22.199.177:35914/5f0e2116
username: 8ksi8q4q
password: bbc4d2e6

# Linux 环境配置
语言字符集 `/etc/locale.conf`
环境变量执行顺序 `/etc/profile->/etc/profile.d->/etc/bashrc->用户的.bash_profile->用户的.bashrc`


