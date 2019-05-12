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
4. 第二次bug 修复
    + 父组件往子组件传值的时候，如果想修改父组件的值，同时存在往子组件传值的时候，自定义事件必须要用 v-on 的形式，不能单独用 ： 的形式，不然的话自定义事件不执行，同时，不能在子组件修改父组件的值，通过this.$emit(父组件自定义事件",'参数')的形式，或this.$emit(父组件自定义事件") 的形式，让父组件修改其data 上的值
    +问题同上，如果想修改父组件的值可以在父组件往子组件传值的时候 加上 .sync 修饰符，如 :a.sync="我是父组件的值",子组件通过props 接收这个值 propos:{a },这时子组件通过  this.$emit('update:a','我是新的值')，来修改
    +问题同上，可以在子组件的 data 上定义一个属性来接收这个 父组件传过来的值，同时使用 ||  添加一个默认值

