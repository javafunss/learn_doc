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

```



