# jackblog angular 1.x 版

## 简介
Jackblog 是使用 Node.js + MongoDB + 其它客户端框架, 开发的个人博客系统,前后端分离,仿简书模板.此为客户端angular 1.x版  
服务端有:  
[express 版](https://github.com/jackhutu/jackblog-api-express)  
[koa 版](https://github.com/jackhutu/jackblog-api-koa)         
客户端有:  
[angular1.x 版](https://github.com/jackhutu/jackblog-angular1)   
[angular2.x 版](https://github.com/jackhutu/jackblog-angular2)  
[react redux 版](https://github.com/jackhutu/jackblog-react-redux)  
[vue 版](https://github.com/jackhutu/jackblog-vue)    
移动端有:   
[react native 版](https://github.com/jackhutu/jackblog-react-native-redux)

## 环境准备
安装sass,compass,以及compass spriting(精灵图)支持.(png图片生成库)  
[sass安装方法](http://sass-lang.com/install)   
[compass安装方法](http://compass-style.org/install)      
[png图片生成库安装方法](http://compass-style.org/help/tutorials/spriting)       
```
$ gem install sass
$ gem install compass
$ gem install oily_png
```

## 开发
 
```
$ npm install
$ bower install
$ gulp serve
```

## 打包  
 
```
$ gulp build 或 gulp serve:dist
```

## 线上布署
```
$ pm2 start process.json
```
可参考[利用git和pm2一键布署项目到vps](http://angular1.jackhu.top/article/55cd8e00c6e998b817a930c7)

## 测试
karma测试:

```
$ gulp test
```
e2e测试:  

```
//需要先在服务端开启测试模式
$ gulp test:e2e
```

## License
MIT