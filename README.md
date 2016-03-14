# node-weixin-request [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
>

## Installation

```sh
$ npm install --save node-weixin-request
```

## Usage


```js
var nodeWeixinRequest = require('node-weixin-request');



//get方法与request.get方法一致
nodeWeixinRequest.get

//raw属性返回require('request')对象
nodeWeixinRequest.raw

//基本的post请求

var url = 'http://www.qq.com';
var params = {
  aa: 1,
  bb: 'aaa'
};

nodeWeixinRequest.request(url, params, function (error, json) {
});


//json的post请求

nodeWeixinRequest.json(url, JSON.stringify(params), function (error, json) {

});

//xml的post请求
nodeWeixinRequest.xml(url, xml, function (error, json) {
});

//发送ssl的请求

//ssl格式1
var ssl = {
  pfx: new Buffer('p12文件二进制数据'),
  pfxKey: 'sodosodf'
};

//ssl格式2
var ssl = {
  pfx: 'p12文件的base64',
  pfxKey: 'sodosodf'
};

// 已经废弃
// ssl格式3
// var ssl = {
//   pkcs12: file,  //全局文件名
//   pfxKey: 'sodosodf'
// };

var reply = "<xml><data>aodsosfd</data></xml>";

nodeWeixinRequest.xmlssl(url, '<xml></xml>', ssl, function (error, json) {

});


//发送文件
var file = path.resolve(__dirname, './cert/aaa.mp3');

nodeWeixinRequest.file(url, file, function (error, json) {

});

//下载文件
//file是下载文件的保存地址
nodeWeixinRequest.download(url, {hel:'sdfsfd'}, file, function (error, json) {
});

```

## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-request.svg
[npm-url]: https://npmjs.org/package/node-weixin-request
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-request.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-request
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-request.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-request
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-request/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-request
