'use strict';
var request = require('request');
var fs = require("fs");
var xml2json = require('xml2json');

module.exports = {

  /**
   * For normal requests
   * @param url
   * @param data
   * @param cb
   */
  request: function (url, data, cb) {
    request.post({url: url, json: true, form: data}, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //Return false if succeeded, else true
        cb(false, body);
      } else {
        cb(true, {message: body});
      }
    });
  },

  /**
   * For json data posting
   *
   * @param url
   * @param data
   * @param cb
   */
  json: function (url, data, cb) {
    request.post({url: url, body: data, json: true}, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        cb(false, body);
      } else {
        cb(true, {message: body});
      }
    });
  },

  /**
   * For xml data posting
   *
   * @param url
   * @param data
   * @param cb
   */
  xml: function (url, xml, cb) {
    request.post({
      url: url, body: xml, headers: {'Content-Type': 'text/xml'}
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var json = null;
        try {
          json = JSON.parse(xml2json.toJson(body));
          cb(false, json.xml);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        cb(true, {message: body});
      }
    });
  },

  /**
   * For xml data posting with ssl
   * @param url
   * @param xml
   * @param ssl
   * @param cb
   */
  xmlssl: function (url, xml, ssl, cb) {
    request.post({
      url: url, body: xml, headers: {'Content-Type': 'text/xml'},
      agentOptions: {
        pfx: fs.readFileSync(ssl.pfx),
        passphrase: ssl.key,
        securityOptions: 'SSL_OP_NO_SSLv3'
      }
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var json = null;
        try {
          json = JSON.parse(xml2json.toJson(body));
          cb(false, json.xml);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        cb(true, {message: body});
      }
    });
  },

  /**
   * For file uploading
   *
   * @param url
   * @param file
   * @param cb
   */
  file: function (url, file, cb) {
    fs.stat(file, function (err) {
      if (err) {
        return cb(true, {message: 'File not exist'});
      }
      var media = fs.createReadStream(file);
      request.post({
        url: url,
        json: true,
        formData: {media: media, nonce: ''}
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          cb(false, body);
        } else {
          cb(true, {message: body});
        }
      });
    });
  },

  /**
   * For file downloading
   *
   * @param url
   * @param data
   * @param file
   * @param cb
   */
  download: function (url, data, file, cb) {
    request.get({url: url, form: data}).pipe(fs.createWriteStream(file).on('finish', cb));
  }
};
