# koa-repath

A `rewrite` middleware for [Koa](http://koajs.com/).

# How to install

```bash
npm install koa-repath --save
```

# How to test
```bash
npm run test
```


# How to use

```javascript
var koa = require('koa');
var repath = require('koa-repath');

var app = koa();

// config repath globally.
repath.config({
  whitelist: ['*/*.js', '*/*.css', /^\/articles\/\w+/],
  on: true
});
// app.use(repath());

```


Example 1:

```javascript
app.use(repath(/^\/blogs(\w+)/, '/blogs/$1'));
// '/blogs123' ==> '/blogs/123'

app.use(repath('/profile', '/v2/profile'));
// '/profile' ==> '/v2/profile'
```


Example 2

```javascript
app.use(repath(/^\/articles(\w+)/, function (path, $1) {
  return +$1 < 100 ? '/articles/$1' : '/v2/articles/$1';
}));

// '/articles99'  ==> '/articles/99'
// '/articles120' ==> '/v2/articles/120'
```

Example-3

```javascript
app.use(repath([{
  src: '/:src..:dst',
  dst: '/commits/:src/to/:dst'
}, {
  src: /^\/users\/(\w)(\d+)/,
  dst: function (path, $1, $2) {
    return $1 !== 'v' ? '/users/nor/$2' : '/users/vip/$2';
  }
}]));

// '/bar..foo' ==> '/commits/bar/to/foo'
// '/users/v1' ==> '/users/vip/1'
// '/users/n3' ==> '/users/nor/3'
```


# Options

- `whitelist`: white list which will be bypassed; default `[]`
- `on`: is turned rewrite; default: `true`



