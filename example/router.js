var router = require('koa-router')();



// ==> /index
router.get('/index', function * (next) {
  this.body = '/index';
  yield next;
});

// ==> /v2/profile
router.get('/v2/profile', function * (next) {
  this.body = '/v2/profile';
  yield next;
});

// ==> /blogs/123
router.get('/blogs/:id', function * (next) {
  this.body = '/blogs/' + this.params.id;
  yield next;
});

// ==> /articles/12
router.get('/articles/:id', function * (next) {
  this.body = '/articles/' + this.params.id;
  yield next;
});

// ==> /articles/123
router.get('/v2/articles/:id', function * (next) {
  this.body = '/v2/articles/' + this.params.id;
  yield next;
});

// ==> /commits/bar/to/foo
router.get('/commits/:src/to/:dst', function * (next) {
  var params = this.params;

  this.body = '/commits/' + params.src + '/to/' + params.dst;
  yield next;
});

// ==> /users/v123 or /users/n123
router.get('/users/:type/:id', function * (next) {
  var params = this.params;

  this.body = '/users/' + params.type + '/' + params.id;
  yield next;
});


module.exports = router;

