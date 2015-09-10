/*global it describe*/

var app = require('../example/app');
var request = require('supertest-koa-agent');
var assert = require('assert');



describe('koa-repath', function () {

  it('has rewrited /index to /index', function (done) {
    request(app).get('/index')
      .expect(function (res) {
        assert.equal(res.text, '/index');
      })
      .expect(200, done);
  });

  it('has rewrited /profile to /v2/profile', function (done) {
    request(app).get('/profile')
      .expect(function (res) {
        assert.equal(res.text, '/v2/profile');
      })
      .expect(200, done);
  });

  it('has rewrited /blogs123 to /blogs/123', function (done) {
    request(app).get('/blogs123')
      .expect(function (res) {
        assert.equal(res.text, '/blogs/123');
      })
      .expect(200, done);
  });

  it('has rewrited /articles100 to /v2/articles/100', function (done) {
    request(app).get('/articles100')
      .expect(function (res) {
        assert.equal(res.text, '/v2/articles/100');
      })
      .expect(200, done);
  });

  it('has rewrited /articles99 to /articles/99', function (done) {
    request(app).get('/articles99')
      .expect(function (res) {
        assert.equal(res.text, '/articles/99');
      })
      .expect(200, done);
  });


  it('has rewrited /bar..foo to /commits/bar/to/foo', function (done) {
    request(app).get('/bar..foo')
      .expect(function (res) {
        assert.equal(res.text, '/commits/bar/to/foo');
      })
      .expect(200, done);
  });

  it('has rewrited /users/v1 to /users/vip/1', function (done) {
    request(app).get('/users/v1')
      .expect(function (res) {
        assert.equal(res.text, '/users/vip/1');
      })
      .expect(200, done);
  });

});

