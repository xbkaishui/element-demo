## Environment

`Node >= 6`

## Start

 - Clone or download this repository
 - Enter your local directory, and install dependencies:

``` bash
npm install
```

## Develop

``` bash
# serve with hot reload at localhost:8010
npm run dev
```

## Build

``` bash
# build for production with minification
npm run build
```

## Useful links 
### vue 插件列表学习 指南

[buble es5 compiler](https://gitlab.com/Rich-Harris/buble)

[rollup 打包工具 next-generation JavaScript module bundler](http://rollupjs.org/)

[typescript](https://www.typescriptlang.org/)

[uglify-js JavaScript parser / mangler / compressor / beautifier library for NodeJS](https://github.com/mishoo/UglifyJS)

[lodash js 工具库](https://lodash.com/docs/4.17.4)

[flow-bin A STATIC TYPE CHECKER FOR JAVASCRIPT ](https://flowtype.org/)

### 饿了吗 
[eleAdmin 后台配置 ](https://git.oschina.net/bfgdqch/EleAdmin)

[element 前端UI](http://element.eleme.io/#/zh-CN/resource)

[element source code ](https://github.com/ElemeFE/element)

[awesome element](https://github.com/ElementUI/awesome-element)

[cooking 脚手架](https://github.com/elemefe/cooking)

### 模拟测试数据 

``````
安装 [json-server](https://github.com/typicode/json-server) 

npm install -g json-server
启动server:
json-server -p 8011 -w data.json
http://localhost:8011/models?_start=1&_limit=10
http://localhost:8011/models?ModId=1
``````