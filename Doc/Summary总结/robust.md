# Robust

## 何时进行参数检查
### 参数的定义
* 不仅是狭义的函数参数。
* 任何等级的一个系统，如果将其看做一个整体，它也相当于一个函数：接受外部数据输入，返回相应
的结果。
* 参数的内容不限于文本，而是任何形式的数据。

### 不需要重复的参数检查
参数需要检查，但在一个**可控的系统**中，同样的数据可能会流经不同模块，每个模块都对同样的
数据进
行参数检查也是没有必要的。

### 可控的系统
* 一个可控的系统意味着：
    * 我可以处理它接收到的任何参数
    * 处理结果一定是我的符合预期的
    * 简单来说，可控的系统是我可以完全预测的
* 可控的系统相当于一个函数式编程的函数。只不过这一系统的规模可以小到一个函数，也可以大到一
个包含软件、硬件（不单单是计算机软硬件）在内的体系。
* 一个完全可控的系统很多情况下都是不存在的，因为随着系统的复杂度增大，难免会出现bug。
* 以本项目为例，我自己编写的部分，在理想的情况下就是一个可控的系统。

### 理论上需要检查的情况
#### 在最严格的情况下，需要检查从可控的系统之外传入的任何数据。
以本项目为例，所有的第三方模块都应该被检查，甚至连JS语言底层部分以及node环境都不属于可控。

#### 实际的情况
对于安全性要求很高的系统，上述最严格的检查想必也是必要的。  
但根据实际的项目情况，可以降低安全性需求，很多可控系统之外的数据需要被信任。  
例如在本项目中，显然不需要进行上述最严格的检查。

#### 以本项目为例，需要检查的外部参数：
* 用户的输入
* 外部API提供的数据
* 经过网络传递到后端的前端数据（虽然前端会对数据进行检查，但从前端到后端的传递过程是属于
可控系统之外的）

### 检查的类型
* 数量是否正确
* 类型是否正确
* 值是否正确，包括是否有效
