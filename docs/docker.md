# docker 安装配置
## 1.Ubuntu 18.04 安装
> 1.更新apt软件包索引并安装软件包以允许apt通过HTTPS使用存储库
>> `sudo apt-get update`  
>> `sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common`  

> 2.添加Docker的官方GPG密钥：
>> `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

> 3.设置稳定的库
>> `sudo add-apt-repository  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs)  stable"` 

> 4.安装
>> `sudo apt-get update`  
>> `sudo apt-get install docker-ce docker-ce-cli containerd.io`

> 5.设置用户
>> `sudo groupadd docker`  
>> `sudo usermod -aG docker $USER`

> 6.启动
>> 1.设置开机自启动
>>> `sudo systemctl enable docker`  
>>> `sudo systemctl start docker`

>> 2.手动启动
>>> `sudo service docker start`

>>> `sudo service docker stop`

>>> `sudo service docker restart`

## 2. CentOS 7.5 安装

```
1.卸载旧的安装
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

2.升级yum
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
