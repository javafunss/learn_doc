# 启动mongo Shell并连接到MongoDB  
`sudo systemctl daemon-reload`
`sudo systemctl start mongod`
`sudo systemctl restart mongod`
`sudo systemctl status mongod`
`sudo systemctl stop mongod`
`sudo systemctl enable mongod`

`mongod --dbpath "D:\software\MongoDB\Server\5.0\data" --logpath "D:\software\MongoDB\Server\5.0\log\mongod.log" --install --serviceName "MongoDB"`

```sql
cd <mongodb安装目录>/bin
mongo --port 28015
mongo "mongodb://mongodb0.example.com:28015"
mongo --host mongodb0.example.com:28015
mongo --host mongodb0.example.com --port 28015

# 具有身份验证的MongoDB实例
mongo "mongodb://alice@mongodb0.examples.com:28015/?authSource=admin"
mongo --username alice --password --authenticationDatabase admin --host mongodb0.examples.com --port 28015

# 连接到MongoDB复制集
mongo "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA"

# 关于TLS/SS连接：
mongo "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA&ssl=true"
```
# 数据库操作  
```sql
# 正在使用的db
db
# 切换数据库
use <database>
```
# 数据查询
```sql
# db是指当前数据库
# myCollection是集合的名称

db.getCollection("3 test").find()

db.collection.find()
# 方法是用于从集合中检索文档的JavaScript方法 
db.collection.find()
# 方法将游标返回到结果。 但是，在mongo shell中，如果未使用var关键字将返回的游标分配给变量，则该游标会自动迭代最多20次，来打印与查询匹配的前20个文档mongo shell将提示 输入it以使其再次迭代20次。
要格式化打印结果，可以将.pretty()添加到操作中，如下所示

db.myCollection.find().pretty()

# mongo Shell中的多行操作
>if ( x > 0 ) {
... count++;
... print (x);
... }

# 退出Shell
请键入quit（）或使用 <Ctrl-C>快捷方式
```

## MongoDB CRUD操作
```sql
# 创建操作
db.collection.insertOne()
db.collection.insertMany()

# 读取操作
db.collection.find

# 更新操作
db.collection.updateOne()
db.collection.updateMany()
db.collection.replaceOne()

# 删除操作
db.collection.deleteOne()
db.collection.deleteMany()

# 增加限制条件
db.collection.find({})

# 示例
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )
# like
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

# 查询嵌套字段
db.inventory.find( { "size.uom": "in" } )
# 查询对嵌入在字段中的字段使用小于运算符 ( $lt) ：hsize
db.inventory.find( { "size.h": { $lt: 15 } } )
# 查询选择嵌套字段h 小于15、嵌套字段uom等于"in"和 status字段等于的所有文档"D"
db.inventory.find( { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } )

# 查询数组
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
   { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
   { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
   { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);

db.inventory.find( { tags: ["red", "blank"] } )

# 如果您希望找到一个包含元素 "red"和的数组"blank"，而不考虑数组中的顺序或其他元素，请使用$all运算符

db.inventory.find( { tags: { $all: ["red", "blank"] } } )

# 查询包含字符串作为其元素之一tags的数组的所有文档
db.inventory.find( { tags: "red" } )

# 按数组索引位置查询元素 
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

# 按数组长度查询数组
db.inventory.find( { "tags": { $size: 3 } } )


```

# 批量写入操作
```sql
# MongoDB 为客户端提供批量执行写入操作的能力。批量写入操作会影响单个集合。MongoDB 允许应用程序确定批量写入操作所需的可接受的确认级别

# 执行批量插入、更新和删除操作的能力
db.collection.bulkWrite()

db.collection.insertMany()

# 有序与无序操作
# 默认情况下，bulkWrite()执行ordered 操作。要指定unordered写操作， ordered : false请在选项文档中设置

try {
   db.characters.bulkWrite(
      [
         { insertOne :
            {
               "document" :
               {
                  "_id" : 4, "char" : "Dithras", "class" : "barbarian", "lvl" : 4
               }
            }
         },
         { insertOne :
            {
               "document" :
               {
                  "_id" : 5, "char" : "Taeln", "class" : "fighter", "lvl" : 3
               }
            }
         },
         { updateOne :
            {
               "filter" : { "char" : "Eldon" },
               "update" : { $set : { "status" : "Critical Injury" } }
            }
         },
         { deleteOne :
            { "filter" : { "char" : "Brisbane" } }
         },
         { replaceOne :
            {
               "filter" : { "char" : "Meldane" },
               "replacement" : { "char" : "Tanys", "class" : "oracle", "lvl" : 4 }
            }
         }
      ]
   );
}
catch (e) {
   print(e);
}
```


# 文本搜索
```sql
# MongoDB使用文本索引和$text运算符

# 文字索引
db.stores.createIndex( { name: "text", description: "text" } )

# $text运算符
# 可以使用以下查询来查找包含“coffee”、“shop”和“java”列表
db.stores.find( { $text: { $search: "java coffee shop" } } )
# 准确的短语
# 您还可以通过将短语包装在双引号中来搜索精确的短语。如果**$search**字符串包含一个短语和单个术语，文本搜索将只匹配包含该短语的文档
db.stores.find( { $text: { $search: "\"coffee shop\"" } } )

# 期限排除
# 要排除一个单词，可以在前面加上一个“-”字符
# 要查找所有包含“java”或“shop”但不包含“coffee”的商店
db.stores.find( { $text: { $search: "java shop -coffee" } } )

# 排序
# 为了排序的结果在相关性分数的顺序，你必须明确项目$meta textScore字段和排序:
db.stores.find( 
      { $text: { $search: "java coffee shop" } },
      { score: { $meta: "textScore" } }
  ).sort( { score: { $meta: "textScore" } } )
```

# 导入/导出
```sql
# 导出
参数说明：
-h:指明数据库宿主机的IP
-u:指明数据库的用户名
-p:指明数据库的密码
-d:指明数据库的名字
-c:指明collection的名字
-f:指明要导出那些列
-o:指明到要导出的文件名
-q:指明导出数据的过滤条件
--authenticationDatabase admin
mongoexport -uroot -proot123 --port 27017 --authenticationDatabase admin -d hhh -c log -o /mongodb/log.json

# 导入
参数说明：
-h:指明数据库宿主机的IP
-u:指明数据库的用户名
-p:指明数据库的密码
-d:指明数据库的名字
-c:指明collection的名字
-f:指明要导入那些列
mongoimport -uroot -proot123 --port 27017 --authenticationDatabase admin -d oldboy -c log1 /mongodb/log.json
```