# Mocha的it函数的同步执行

先看以下代码：
```js
// 把一个条目的info属性修改为oNewInfo
// 该条目之前的title属性是['日本妖怪大事典-old']，修改后会变成['日本妖怪大事典-new']
const oNewInfo = {
    ISBN: '9784048839266',
    title: ['日本妖怪大事典-new'],
    author: ['水木しげる', '村上健司 '],
    officialSite: 'https://book.douban.com/subject/6023928/',
};
const modify = async ()=>{
    await Item.modifyItemInfo([0, 0, nExpectedInnerID], oNewInfo);
    console.log(1111);
};

// 查看这个条目
const check  = async ()=>{
    console.log(22222);
    const oItem = await Item.getItem([0, 0, nExpectedInnerID]);
    console.log(oItem.info.title[0]);
};
modify();
check();
```

输出结果是：
```shell
22222
日本妖怪大事典-old
1111
```

因为涉及到异步操作，所以这是合理的顺序。  

但是在使用Mocha测试时：
```js
it('modify for current item', async ()=>{
    const result = await Item.modifyItemInfo([0, 0, nExpectedInnerID]
        , oNewInfo);
    console.log(1111);
    assert.strictEqual(result, true);
});
it('check modification', async ()=>{
    console.log(22222);
    const oItem = await Item.getItem([0, 0, nExpectedInnerID]);
    console.log(oItem.info.title[0]);
    assert.deepStrictEqual(oItem.info, oNewInfo);
});
```

输出为：
```shell
1111
22222
日本妖怪大事典-new
```

Mocha对it函数中的async函数看起来是按照这样的逻辑执行的：
```js
await modify();
await check();
```

我这里的测试逻辑就是先修改再检查修改结果，所以Mocha这种逻辑正好是符合预期的。
