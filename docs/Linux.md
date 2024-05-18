# Linux 常用命令总结
递归删除指定文件：
```bash
# 创建用户相关
#创建nginx用户和组：如果确实打算以“nginx”用户运行Nginx服务，你需要首先在系统中创建这个用户和对应的组。可以通过下面的命令来实现：

sudo useradd -r -s /usr/sbin/nologin -M nginx

# find 查找相关

find . -name '*.*' -type f -print -exec rm -rf {} \;
. 表示从当前目录开始递归查找
-name '.' 根据名称来查找，要查找所有以 .* 结尾的文件夹或文件
-type f 查找的类型为文件
-print 输出查找的文件目录名
-exec 后跟一个所要执行的命令，表示将 find 出来的文件或目录执行该命令
```

## linux 
scp 从一台机器拷贝文件到另一台
```sh
scp root@112.124.22.190:/root/app/db_dump/plm_db_rel_dump/20230802.tar ./20230802.tar
```

find 命令相关
```sh
# 查找/etc目录下最大的5个文件：
find /etc -type f -printf “%s\t%p\n” | sort -n | tail -5 | xargs ls -Slh
# 查找当前用户名下最大的10个文件
find $HOME -type f -printf “%s\t%p\n” | sort -nr | head -10 | xargs ls -Slh
# 查找大文件 大于 200M
find / -type f -size +50M | xargs ls -Slh
# 100M -200M
find / -type f -size +100M -size +200M | xargs ls -Slh
# 查询root目录下最大的5个文件
find /root -type f -exec ls -s {‌} ; | sort -n | tail -n5 | xargs ls -Slh
# 查询/目录下10天以前最大的5个文件
find / -type f -mtime +10 -printf “%s\t%p\n” | sort -n | tail -5 | xargs ls -Slh


# 你可以修改命令，让find递归地删除__MACOSX目录及其包含的所有文件和子目录。这可以通过在-delete之前增加一个-exec动作来实现，使用rm -r命令递归删除找到的每个__MACOSX目录,这里，-exec rm -rf {} +部分的意思是对于find找到的每个匹配项（在这里是每个__MACOSX目录），执行rm -rf命令进行递归删除。{} +是find命令中的特殊语法，用来收集所有匹配的文件或目录，并一次性传递给rm命令，这样可以更高效地执行删除操作

find . -type d -name '__MACOSX' -print -exec rm -rf {} +


# 进程相关
查询进程详细信息：使用ps命令加上-p选项和PID来查看该进程的详细信息，包括可执行文件的路径。命令格式如下：`ps -p <PID> -o comm=`

top命令:
筛选显示内容：在top运行时，可以按f键进入字段选择界面，然后通过空格键来选择或取消显示的列。如果你想重点关注CPU和内存，确保%CPU和%MEM这两列是启用的。完成后按回车返回

top 命令后,解释   PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND:
在Linux系统中，top命令是一个实时显示系统中各个进程资源占用状况的动态视图工具。当你运行top命令后，会看到一个更新的列表，其中每行代表一个正在运行的进程。下面是列表中各列含义的解释：

PID: 进程ID，每个运行的进程都有一个唯一的数字标识符。

USER: 运行此进程的用户账号名称。

PR: 优先级(Priority)，越小的值表示优先级越高。

NI: Nice值，负值表示优先级高于普通进程，正值则相反，表示愿意放弃一些CPU时间给其他进程。

VIRT: 虚拟内存使用量，包括进程可以访问的所有内存，包括代码、数据、共享库以及已交换出的内存。

RES: 常驻内存使用量(Resident Set Size)，表示当前进程实际占用物理内存的大小，不包括交换空间。

SHR: 共享内存量，该进程与其他进程共享的内存部分。

S: 进程状态，如R(运行)、S(休眠)、D(不可中断的睡眠)、Z(僵尸进程)等。

%CPU: CPU使用率，自上次更新以来，该进程占用CPU的时间百分比。

%MEM: 内存使用率，进程使用的物理内存占总内存的百分比。

TIME+: 该进程启动至今所累计的CPU时间，格式是“分钟:秒”。

COMMAND: 进程的命令行名称，即启动该进程的命令或程序名


```



