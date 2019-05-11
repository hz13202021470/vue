# world

> A Vue.js project
>
> 一个使用vue 仿饿了么的项目

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

# 技术实用vue2 + vue-router + vuex+axios+express

1. 数据实用json 文件保存，实用express 模拟接口
2. 实用axios 请求接口获取数据
3. 第一次bug 修复记录
   + 在shopCar 组件中，当点击组件是，如果让已选择的食物可以滚动，在切换食物列表的时候，不能把better-scroll 插件的初始化在methods定义，如果点击组件，滚动方法调用，会造成carButton 组件在食物列表出现bug,如点击 + 会成倍加，反之**-**  也是，有时候会直接删除食物 
   + 新增购物车动画
4. 5
