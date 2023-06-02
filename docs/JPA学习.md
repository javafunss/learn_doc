# JPA总结

## Entity元类

### 实体属性字段

+ ID字段

```  
@ID 标示主键
标示主键生成方式策略
@GeneratedValue 
根据JPA持久化设置的方言,数据库类型自动选择(可以省略AUTO)
@GeneratedValue(strategy = GenerationType.AUTO)
自增长(mysql方式)
@GeneratedValue(strategy = GenerationType.IDENTITY)
序列(orcle方式)
@GeneratedValue(strategy = GenerationType.SEQUENCE)
数据库TABLE 设置步长的方式(效率不高)
@GeneratedValue(strategy = GenerationType.TABLE)


如果使用Hibernate对JPA的实现，可以使用Hibernate对主键生成策略的扩展，通过Hibernate的@GenericGenerator实现。
@GenericGenerator(name = "system-uuid", strategy = "uuid")　声明一个策略通用生成器，name为"system-uuid",策略strategy为"uuid"。

@GeneratedValue(generator = "system-uuid")　用generator属性指定要使用的策略生成器。

这是我在项目中使用的一种方式，生成32位的字符串，是唯一的值。最通用的，适用于所有数据库。
``` 
+ 日期字段  

```
@Temporal注解的作用就是帮Java的Date类型进行格式化，一共有三种注解值:

第一种：@Temporal(TemporalType.DATE)——>实体类会封装成日期“yyyy-MM-dd”的 Date类型。

第二种：@Temporal(TemporalType.TIME)——>实体类会封装成时间“hh-MM-ss”的 Date类型。

第三种：@Temporal(TemporalType.TIMESTAMP)——>实体类会封装成完整的时间“yyyy-MM-dd hh:MM:ss”的 Date类型

@DataFormAT主要是前后到后台的时间格式的转换
@DateTimeFormat(pattern = "yyyy-MM-dd")

@JsonFormat主要是后台到前台的时间格式的转换
pattern:是你需要转换的时间日期的格式
timezone：是时间设置为东八区，避免时间在转换中有误差
@JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
 
```

+ 枚举类型
```
@Enumerated
将枚举值存放数据库
@Enumerated(EnumType.STRING) 
将枚举序列号存放数据库
@Enumerated(EnumType.ORDINAL)
```

+ 大文本对象
```
@Lob
@Basic(fetch=FetchType.LAZY) 属性延迟加载 
@Lob (作用在字符串上,存储在数据库类型为LONGTEXT)
private String text;

@Lob (作用在byte[] 数组上,存储在数据库类型为二进制数据LONGBLOB)
private Byte[] file;
```

+ 字段不作为持久化对象
```
@Transient 
1.一旦变量被transient修饰，变量将不再是对象持久化的一部分，该变量内容在序列化后无法获得访问。
2.transient关键字只能修饰变量，而不能修饰方法和类。注意，本地变量是不能被transient关键字修饰的。变量如果是用户自定义类变量，则该类需要实现Serializable接口。
3.被transient关键字修饰的变量不再能被序列化，一个静态变量不管是否被transient修饰，均不能被序列化
```
## JPA实体对应关系应用
### 一对多,多对一 关系
```java
@Entity
@Data
public class Order{
    @Id
    @GeneratedValue
    private String orderId;
    private float amount = 0f;

    /**
    * cascade=CascadeType.PERSIST 级联保存
    * cascade=CascadeType.MERGE 级联更新
    * cascade=CascadeType.REFRESH 级联刷新
    * cascade=CascadeType.REMOVE 级联删除
    * 当insert order 记录时候,会同时 insert orderItem
    * 当修改order在游离状态下,修改了order属性,会级联更新orderitem里面的数据
    * 先删除订单项,在删除订单
    * mappedby 指名order类为被维护端,由维护端OrderItem的 order 属性维护
    */
    @OneToMany(cascade=CascadeType.REFRESH,cascade=CascadeType.PERSIST,cascade=CascadeType.MERGE,fetch=FetchType.LAZY,mappedBy="order")
    private Set<OrderItem> items = new HashSet<OrderItem>();
}

@Entity
@Data
public class OrderItem{
    @Id
    @GeneratedValue
    private String id;
    @Column(length=40,nullable=false)
    private String productName;
    @Column(nullable=false)
    private float sellPrice;

    /**
    *optional 代表是否可选,true可选,则允许order为空;
    不可选则必然存在
    * @JoinColumn 指定关联的外键,使用orderItem的'order_id' 与 order的 'order_id'进行外键关联
    */
    @ManyToOne(cascade=CascadeType.MERGE,cascade=CascadeType.REFRESH,optional=false)
    @JoinColumn(name="order_id")
    private Order order;
}
```

`1-m:多的一方为关系的维护端,关系维护端负责外键记录(字段)的更新;关系被维护端没有权利更新外键字段,many端默认为延迟加载;拥有mappedBy注解的实体类为关系被维护端`

### 一对一 关系
```java
@Entity
@Data
public class Person{
    @Id
    @GeneratedValue
    private String id;
    private String name;

    @OneToOne(cascade=CascadeType.MERGE,cascade=CascadeType.REFERSH,cascade=CascadeType.REMOVE,
    cascade=CascadeType.PERSIST)
    @JoinColumn(name="idCard_id")
    private IDCard idCard;
}

@Entity
@Data
public class IDCard{
    @Id
    @GeneratedValue
    private String id;
    @Column(length=18,nullable=false)
    private String cardNo;

    @OneToOne(mappedBy="idCard",cascade=CascadeType.PERSIST,cascade=CascadeType.MERGE,cascade=CascadeType.REFERSH,optional=false)
    private Persion person;
}
``` 
`1-1: JPA规范没有明确谁作为关系维护端,由用户自己确定,mappedBy属性的类,为关系被维护端`

### 多对多关系
```java
@Entity
@Data
public class Student{
    @Id
    @GeneratedValue
    private String id;
    @Column(length=10,nullable=false)
    private Stirng name;

    /**
    * inverseJoinColums 跟关系被维护端的外键的定义,中间表的teacher_id 与 teacher表主键关联
    * joinColumns 关系的维护端的外键定义,中间表的 student_id 与 student表主键关联
    */
    @ManyToMany(cascade=CascadeType.REFERSH)
    @JoinTable(name="student_teacher",inverseJoinColums=@JoinColums(name="teacher_id"),joinColumns=@JoinColuns(name="student_id"))
    private Set<Teacher> teachers = new HashSet<Teacher>();
}

@Entity
@Data
public class Teacher{
    @Id
    @GeneratedValue
    private String id;
    @Column(length=10,nullable=false)
    private String name;

    @ManyToMany(cascade=CascadeType.REFERSH,mappedBy="teachers")
    private Set<Student> students = new HashSet<Student>();
}
```
`m-m: 双向多对多为对等关系,由用户确定谁为关系维护端,采用中间表确定关系的建立`

### JPA联合主键实体
```java
@Embeddable
public class AirLinePK{
    private String startCity;
    private String endCity;

}

@Entity
@Data
public class AirLine{
    @EmbeddedId
    private AirLinePK id;
    private String name;

}
```


## JPA 持久化数据库方法
### EntityManager 管理  
+ 瞬时状态（new/transient）：没有主键，不与持久化上下文关联，即 new 出的对象（但不能指定id的值，若指定则是游离态而非瞬时态）
+ 托管状态（persistent）：使用EntityManager进行find或者persist操作返回的对象即处于托管状态，此时该对象已经处于持久化上下文中（被EntityManager监控），任何对该实体的修改都会在提交事务时同步到数据库中。
+ 游离状态（detached）：有主键，但是没有跟持久化上下文关联的实体对象。
+ 删除状态 （deleted）：当调用EntityManger对实体进行remove后，该实体对象就处于删除状态。其本质也就是一个瞬时状态的对象

========================================
+ find 查找实体对象
+ getReference 返回实体对象的代理对象,延迟加载,在调用实体对象属性时候从数据库里加载
+ clear 使实体对象处于游离状态
+ merge 将游离状态的实体对象更改同步回数据库
+ remove 将托管状态实体对象,从数据库删除,此时实体对象处于删除状态.

+ createQuery 使用面向对象的查询语句,进行查询


**测试创建Session管理方式**
+ Hibernate方式  
SessionFactory->session->begin事务开启

+ JPA方式
EntityManagerFactory->EntityManger->begin事务开启