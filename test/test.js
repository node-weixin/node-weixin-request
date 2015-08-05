'use strict';
var assert = require('assert');
var nodeWeixinRequest = require('../');

describe('node-weixin-request node module', function () {
  it('should make url parameters', function () {

    var params = {
      a: '1',
      c: '2',
      'd-c': 'aaa'
    };

    var url = nodeWeixinRequest.toParam(params);
    assert.equal(true, url === 'a=1&c=2&d-c=aaa');
     params = {
      a: '1',
      c: '2',
      '美国': '中国'
    };

    url = nodeWeixinRequest.toParam(params);
    assert.equal(true, url === 'a=1&c=2&%E7%BE%8E%E5%9B%BD=%E4%B8%AD%E5%9B%BD');
  });
});
