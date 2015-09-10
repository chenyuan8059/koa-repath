var koa = require('koa');
var router = require('./router');
var repath = require('..');



var app = koa();


// ====== repath
repath.config({
  whitelist: ['*/*.js', '*/*.css'],
  on: true
});

app.use(repath(/^\/blogs(\w+)/, '/blogs/$1'));

app.use(repath('/profile', '/v2/profile'));

app.use(repath(/^\/articles(\w+)/, function (path, $1) {
  return +$1 < 100 ? '/articles/$1' : '/v2/articles/$1';
}));

app.use(repath([{
  src: '/:src..:dst',
  dst: '/commits/:src/to/:dst'
}, {
  src: /^\/users\/(\w)(\d+)/,
  dst: function (path, $1, $2) {
    return $1 !== 'v' ? '/users/nor/$2' : '/users/vip/$2';
  }
}]));


// ====== router
app.use(router.routes());


module.exports = app;



