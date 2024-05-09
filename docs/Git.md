## 安装
## 环境配置

## 常用命令
Git命令：

添加提交：`git add file git commit -m "注释"`  

查看状态：`git status`

比较差异：`git diff`

历史记录：`git log --graph`

回退到上一版本：`git reset --hard HEAD^`

回退到指定版本：`git reset --hard 326123`

查看命令历史：`git reflog`

丢弃缓存: `git rm -r -f --cached .`

丢弃工作区修改：`git checkout -- readme.txt`

丢弃暂存区的修改：`git reset HEAD readme.txt`

创建远程仓库并关联：`git remote add origin git@github.com:michaelliao/learngit.git`  

将本地master推送到远程：`git push -u origin master`

克隆项目：`git clone git@github.com:xxx`



查看分⽀：`git branch`

查看远程分支: `git branch -r`

查看远程仓库列表: `git remote -v`

创建分⽀：`git branch name`

切换分⽀：`git checkout name`

创建+切换分⽀：`git checkout -b name`

合并某分⽀到当前分⽀：`git merge name`

删除分⽀：`git branch -d name`

强制删除分支：`git branch -D feature-vulcan`

查看stash存储区：`git stash list`
修复bug时，我们会通过创建新的bug分⽀进⾏修复，然后合并，最后删除；
当⼿头⼯作没有完成时，先把⼯作现场`git stash`⼀下，然后去修复bug，修复后，再`git stash pop`，回到⼯作现场

查看远程库信息，使⽤：`git remote -v`；

从本地推送分⽀，使⽤：`git push origin branch-name`，


在本地创建和远程分⽀对应的分⽀使⽤：`git checkout -b branch-name origin/branchname`，  

本地和远程分⽀的名称最好一致，建⽴本地分⽀和远程分⽀的关联:
使⽤：`git branch --set-upstream branch-name origin/branch-name`
如果分支还没有与远程建立关联，先添加关联: `git branch --set-upstream-to=origin/main`

从远程抓取分⽀，使⽤git pull，如果有冲突，要先处理冲突命令`git tag name`⽤于新建⼀个标签，默认为HEAD，也可以指定⼀个commit id；

标签：
可以查看所有标签:`git tag`

切换到分支`git checkout bracnname`,打标签 `git tag name`

默认标签是打在最新提交的commit上的,历史提交的commit id,打标签 `git tag tagname id12321`

创建带有说明的标签,指定标签信息:`git tag -a tagname -m "blablabla..."`

推送⼀个本地标签:`git push origin tagname`

推送全部未推送过的本地标签:`git push origin --tags`

删除⼀个本地标签:`git tag -d tagname`

删除⼀个远程标签:`git push origin :refs/tags/tagname`

创建项目并与远程关联
```sh
git init   // 1. 初始化项目文件夹
 
git add .  // 2. 将所有文件添加到暂存区
 
git commit -m "first commit"   // 3. 提交到本地仓库，双引号内是提交的备注信息
 
git remote add origin XXX     //  4. （XXX就是你github或者码云等远程仓库的地址，git branch这个命令可以看到你所在的分支，删除某个仓库地址使用git remote rm origin）
 
git pull    // 5. 拉取远程主分支信息，首次拉取合并信息
 
git push -u -f origin master  // 6. 提交到远程仓库，这个命令中的 -f 是强制推送，因为远程仓库只有初始化的文件，所以强制推送上去就行了，不加-f 会报当前分支没有远程分支，强制推送可以覆盖master，这样就完成了第一次提交的步骤)

1. 创建本地分支
git branch 分支名，例如：git branch 2018-10-30
注：2018-10-30 是分支名称，可以随便定义。

2. 切换本地分支
git checkout 分支名，例如从 master 切换到分支：git checkout 2018-10-30

3. 远程分支就是本地分支 push 到服务器上。比如 master 就是一个最典型的远程分支（默认）。
git push origin 2018-10-30

4. 远程分支和本地分支需要区分好，所以，在从服务器上拉取特定分支的时候，需要指定远程分支的名字。
git checkout --track origin/2018-10-30
注意该命令由于带有 --track 参数，所以要求 git1.6.4 以上！这样 git 会自动切换到分支。

5. 提交分支数据到远程服务器
git push origin <local_branch_name>:<remote_branch_name>
例如：
git push origin 2018-10-30:2018-10-30
一般当前如果不在该分支时，使用这种方式提交。如果当前在 2018-10-30 分支下，也可以直接提交
git push

6. 删除远程分支
git push origin :develop

```

在GitHub上，可以任意Fork开源仓库；
• ⾃⼰拥有Fork后的仓库的读写权限；
• 可以推送pull request给官⽅仓库来贡献代码。



## svn 迁移 git
```sh
svn log --xml | grep "^<author" | sort -u | \awk -F '<author>' '{print $2}' | awk -F '</author>' '{print $1}' > userinfo.txt

git svn clone ["SVN repo URL"] --prefix=svn/ --no-metadata --authors-file=userinfo.txt --stdlayout 
```


