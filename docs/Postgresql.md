# 环境配置

### DML

创建索引 `create index idx_xxx on xxx(column)`

### 2.常用命令说明：

1.新增用户：

```postgresql
create role nhoa password 'Abcd1234';
create database nhoa owner nhoa;
ALTER ROLE nhoa WITH LOGIN SUPERUSER;
\c nhoa
create extension pgcrypto;
```

2.字符串操作：
日期加减处理：

```postgresql
TO_TIMESTAMP('20161026', 'YYYYMMDD) + (字段||'days')::interval
```

3.数据备份与恢复

```
# cd /home
# mkdir postgres
# chown postgres:postgres postgres

# cd /root
# mkdir bin
# cd bin
# vi crm.dbback.sh

#! /bin/bash

su - postgres -c "/usr/bin/pg_dump -h localhost crm | gzip --best > "/home/postgres/$(date +%Y-%m-%d_%H-%M-%S).sql.gz""

```

4.单表数据导入

```
psql -d crm -U crm -f < /data/a.sql

psql -d crm -U crm -f D:\data\a.sql
```
