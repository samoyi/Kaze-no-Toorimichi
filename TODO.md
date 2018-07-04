# 详细的文档在 `Doc` 目录下

**本地测试时，需要把 `documents.txt` 文件的数据导入本地 MongoDB 数据库。  
数据库名为`project`, collection 名为`documents`。**


## TODO
### Security
* Directory traversal attack
* What is *streaming parser* in https://livebook.manning.com/#!/book/node-js-in-action/chapter-4/176
* Display file-upload progress on front-end with socket.io
* Can not test HTTPS, can't install openssl on windows https://livebook.manning.com/#!/book/node-js-in-action/chapter-4/232

### kukaku
`getDivisions`对`東京都府中市`的处理

### Item类
* 对ISBN的检查
* 对IMDb的检查

### Data
多个名字的神社

### 主题系统
* 行事主题记录行事场所ID。例如 祇園祭 主题会记录 八坂神社 的主题ID
* 添加节气相关主题
* 是否需要city属性

### 其他
用 `Object.defineProperty` 来给原型添加 `constructor` 属性
