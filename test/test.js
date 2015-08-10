'use strict';
var assert = require('assert');
var nodeWeixinRequest = require('../');

describe('node-weixin-request node module', function () {

  it('should be able to request correctly', function (done) {
    var nock = require('nock');
    var url = 'http://domain.com';
    var reply = {
      _id: '123ABC',
      _rev: '946B7D1C',
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    };

    nock(url)
      .post('/')
      .reply(200, reply);
    nodeWeixinRequest.request(url + "/", {a:1}, function (error, body) {
      assert.equal(true, error === false);
      assert.equal(true, body._id === reply._id);
      assert.equal(true, body._rev === reply._rev);
      assert.equal(true, body.username === reply.username);
      assert.equal(true, body.email === reply.email);
      done();
    });
  });

  it('should be able to request with error', function (done) {
    var nock = require('nock');
    var url = 'http://domain.com';
    var reply = {
      _id: '123ABC',
      _rev: '946B7D1C',
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    };

    nock(url)
      .get('hello/')
      .reply(200, reply);

    nodeWeixinRequest.request(url, {}, function (error) {
      assert.equal(true, error === true);
      done();
    });
  });

  it('should be able to request with json data', function (done) {
    var nock = require('nock');
    var url = 'http://domain.com';
    var json = {
      a: 'a',
      b: 'b'
    };
    var reply = {
      _id: '123ABC',
      _rev: '946B7D1C',
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    };

    nock(url)
      .post('/')
      .reply(200, reply);
    nodeWeixinRequest.json(url, JSON.stringify(json), function (error, body) {
      assert.equal(true, error === false);
      assert.equal(true, body._id === reply._id);
      assert.equal(true, body._rev === reply._rev);
      assert.equal(true, body.username === reply.username);
      assert.equal(true, body.email === reply.email);
      done();
    });
  });

  it('should not be able to request with json data correctly', function (done) {
    var nock = require('nock');
    var url = 'http://domain.com';
    var json = {
      a: 'a',
      b: 'b'
    };
    var reply = {
      _id: '123ABC',
      _rev: '946B7D1C',
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    };

    nock(url)
      .get('/')
      .reply(200, reply);
    nodeWeixinRequest.json(url, JSON.stringify(json), function (error) {
      assert.equal(true, error === true);
      done();
    });
  });

  /*

   it('should be able to request with xml data', function(done) {
   var nock = require('nock');
   var url = 'http://domain.com';
   var fs = require('fs');
   var path = require('path');
   var xml = String(fs.readFileSync(path.resolve(__dirname, './sample.xml')));
   var reply = {
   _id: '123ABC',
   _rev: '946B7D1C',
   username: 'pgte',
   email: 'pedro.teixeira@gmail.com'
   };

   var couchdb = nock(url)
   .post('/')
   .reply(200, reply);
   nodeWeixinRequest.xml(url, xml, function(error, body) {
   assert.equal(true, error === false);
   assert.equal(true, body._id === reply._id);
   assert.equal(true, body._rev === reply._rev);
   assert.equal(true, body.username === reply.username);
   assert.equal(true, body.email === reply.email);
   done();
   });
   });

   it('should not be able to request with xml data correctly', function(done) {
   var nock = require('nock');
   var url = 'http://domain.com';
   var fs = require('fs');
   var path = require('path');
   var xml = fs.readFileSync(path.resolve(__dirname, './sample.xml'));
   var reply = {
   _id: '123ABC',
   _rev: '946B7D1C',
   username: 'pgte',
   email: 'pedro.teixeira@gmail.com'
   };

   var couchdb = nock(url)
   .get('/')
   .reply(200, reply);
   nodeWeixinRequest.xml(url, xml, function(error, body) {
   assert.equal(true, error === true);
   done();
   });
   });

   it('should be able to request with xml data and ssl', function(done) {
   var nock = require('nock');
   var fs = require('fs');
   var url = 'http://domain.com';
   var fs = require('fs');
   var path = require('path');
   var xml = String(fs.readFileSync(path.resolve(__dirname, './sample.xml')));
   var reply = {
   _id: '123ABC',
   _rev: '946B7D1C',
   username: 'pgte',
   email: 'pedro.teixeira@gmail.com'
   };

   var couchdb = nock(url)
   .post('/')
   .reply(200, reply);
   nodeWeixinRequest.xmlssl(url, xml, function(error, body) {
   assert.equal(true, error === false);
   assert.equal(true, body._id === reply._id);
   assert.equal(true, body._rev === reply._rev);
   assert.equal(true, body.username === reply.username);
   assert.equal(true, body.email === reply.email);
   done();
   }, {
   cert: '',
   key: ''
   });
   });
   */
});
