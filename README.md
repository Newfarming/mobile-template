# Club Factory msite

> m 站的 pwa 改造

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 前端代码规范

### vue 编码规范

更多可以参考[这里](https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-CN.md)以及[这里](https://cn.vuejs.org/v2/style-guide/index.html)

1.  Vue 文件名  单词首页字母全部大写

2.  method 方法命名：

    - ajax 数据请求：以 get、post 开头，以 data 结尾

      ```js
      getListData、postFormData
      ```

    - 事件：事件方法以 on 开头

      ```js
      onChangeColor、onChangeStatus
      ```

    - 驼峰命名规则

3.  vue 方法一般放置顺序

    - components（组件）

    - props（组件之间的传递值）

    - data（初始化数据）

    - computed (计算属性，做逻辑处理)

    - methods (方法)

    - mounted（钩子函数，一般调用方法）

4.  组件中没有使用的 Vue 内置的方法，不要写上去，没有用到的方法和变量不要提交到 git 中，提交之前全部删掉，打印的日志可以留着，但是在重构过组件之后不要留存和组件  组件无关的代码

5.  如果没有必要，组件中不要写内联的样式

6.  关于组件抽象

    一般来说，有些很基础的组件可以做到很抽象，也就是做成一个通用组件，但是，同样意味着这个组件功能尽可能的简单，对于复杂的组件做到很抽象其实需要花费很多时间

    而有些组件就是不需要做到很抽象，我就是想这个组件完成一个功能，而这个功能内部却又比较复杂，逻辑计算比较多， 这种情况  就不要想着做一个通用的，做成一个高内聚的组件即可

    一个组件就只做一件事情最好

### JavaScript 编码规范

1.  js 文件名

    多个单词之间使用 `-` 分隔开，例如 `url-config.js`

2.  文件夹命名

    多个单词之间使用下划线分隔，单词全部小写，eg: `node_modules`

### i18n

1.  国际化文件中的变量名使用驼峰法

### vue-router

1.  路由名称使用驼峰发，开头字母小写
2.  调用路由的时候要使用路由名称调用

### vuex

关于 vuex，我有些想法，很多时候发现并不太需要用到...而且这个东西会搞得很麻烦...很多时候组件内聚下就可以了，并不需要从公共的地方获取到数据...
