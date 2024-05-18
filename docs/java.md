# java 基础编程类
```java
// yml 动态读取配置分组属性

/**
 * sku:
  groups:
    '[主数据属性]':
      - standardDisplayQuantity
      - minimumDisplayQuantity
**/

//但请注意，上述方法直接尝试将分组内容解析为List类型，这与您原本的配置结构不符，因为Spring原生不支持将列表内的元素直接作为属性名提取。因此，对于您的特定需求，更合适的可能是直接操作YAML源数据，但这需要自定义逻辑来解析YAML

import org.springframework.core.env.ConfigurableEnvironment;

// ...

@Autowired
private ConfigurableEnvironment env;

public List<String> getGroupAttributes(String groupName) {
    // 假设groupName为'[主数据属性]'
    String prefix = "sku.groups." + groupName;
    return env.getProperty(prefix, List.class);
}

// 如果需要更灵活地处理配置，可以考虑使用第三方库直接解析YAML字符串，如使用Jackson或SnakeYAML。这里是一个简化的使用SnakeYAML的示例
//此方法需要您能够访问到整个YAML配置文件的字符串内容，并手动解析它来获取特定分组下的属性列表
import org.yaml.snakeyaml.Yaml;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

// ...

public List<String> getGroupAttributesFromYaml(String yamlContent, String groupName) {
    Yaml yaml = new Yaml();
    Map<String, Object> parsed = yaml.load(yamlContent);
    
    // 假设yamlContent是整个配置文件的内容
    Map<String, List<String>> groups = (Map<String, List<String>>) parsed.get("sku").get("groups");
    List<String> attributes = groups.get(groupName);
    
    return attributes != null ? attributes : Collections.emptyList();
}

//如果您已经解析得到属性名称列表，并希望通过反射来根据属性名从一个对象中获取属性值
//这个例子中，createGettersMap方法在启动时根据提供的属性名列表创建了一个映射，每个属性名对应一个lambda表达式，该表达式直接调用了对象的getter方法来获取属性值。这种方法避免了运行时的反射调用，提高了属性访问的效率，但需要确保对象遵循Java Bean的命名规范（即存在相应的getter方法）

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class EfficientReflectionExample {

    public static void main(String[] args) {
        YourObject obj = new YourObject();
        List<String> attributeNames = Arrays.asList("standardDisplayQuantity", "minimumDisplayQuantity");

        // 初始化属性访问器映射
        Map<String, Function<YourObject, ?>> getters = createGettersMap(YourObject.class, attributeNames);

        // 使用映射获取属性值
        for (String attributeName : attributeNames) {
            Function<YourObject, ?> getter = getters.get(attributeName);
            if (getter != null) {
                Object value = getter.apply(obj);
                System.out.println("属性 " + attributeName + " 的值为: " + value);
            } else {
                System.out.println("未找到属性 " + attributeName);
            }
        }
    }

    /**
     * 根据属性名列表创建一个映射，映射键为属性名，值为获取属性值的函数。
     */
    private static <T> Map<String, Function<T, ?>> createGettersMap(Class<T> clazz, List<String> attributeNames) {
        return attributeNames.stream()
                .filter(name -> hasGetter(clazz, name))
                .collect(Collectors.toMap(
                        name -> name,
                        name -> createGetter(clazz, name)
                ));
    }

    /**
     * 检查给定类是否有指定名称的getter方法。
     */
    private static boolean hasGetter(Class<?> clazz, String propertyName) {
        String getterName = "get" + Character.toUpperCase(propertyName.charAt(0)) + propertyName.substring(1);
        try {
            clazz.getMethod(getterName);
            return true;
        } catch (NoSuchMethodException e) {
            return false;
        }
    }

    /**
     * 为指定属性名创建getter函数。
     */
    private static <T> Function<T, ?> createGetter(Class<T> clazz, String propertyName) {
        String getterName = "get" + Character.toUpperCase(propertyName.charAt(0)) + propertyName.substring(1);
        try {
            java.lang.reflect.Method method = clazz.getMethod(getterName);
            return (Function<T, ?>) t -> {
                try {
                    return method.invoke(t);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            };
        } catch (NoSuchMethodException e) {
            throw new IllegalArgumentException("No getter found for property: " + propertyName);
        }
    }
}

class YourObject {
    private int standardDisplayQuantity = 100;
    private int minimumDisplayQuantity = 50;

    public int getStandardDisplayQuantity() {
        return standardDisplayQuantity;
    }

    public int getMinimumDisplayQuantity() {
        return minimumDisplayQuantity;
    }
}

```