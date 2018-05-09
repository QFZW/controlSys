# controllsystem 单灯控制系统

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> 可以在以下地址模拟数据接口

``` javascript
/*
 * easy Mock
 * URL: https://www.easy-mock.com/
 * user Vincent13T
 * pwd 123321123
 */
```

## axios 使用

> 注入到全局

```javascript
// 更佳优雅的引入
Object.defineProperty(Vue.prototype, '$HTTP', { value: service })

// 一个例子
this.$HTTP.get('/mock/5aeeba99ee70f3596f06e54a/example/mock')
  .then(res => {
    let projects = res.data.data.projects
    console.log(projects)
  }).catch(() => {})
```

## 目录结构

```text
    .
    ├── controllSys         // 跟项目目录
    ├── ├── src             // 开发根目录
    ├── ├── ├── assets      // 静态资源、图片等
    ├── ├── ├── components  // 公共组件
    ├── ├── ├── mock        // mock 数据
    ├── ├── ├── router      // 路由
    ├── ├── ├── store       // store
    ├── ├── ├── styles      // 公共的样式文件
    ├── ├── ├── utils       // 一些工具类
    ├── ├── ├── views       // 页面文件
```
