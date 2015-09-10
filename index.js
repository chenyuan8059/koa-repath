var _ = require('lodash')
  , debug = require('debug')('koa-rewrite')
  , toRegexp = require('path-to-regexp');


const DEFAULTS = {
  on: true, // is turned rewrite
  whitelist: [] // white list which will be bypassed
};

var _params_ = _.clone(DEFAULTS);

function toMap(params) {
  var map = {};

  params.forEach(function(param, index){
    param.index = index;
    map[param.name] = param;
  });

  return map;
}

function * noop (next) {
  yield next;
}

function * core (drops, options, next) {
  var match, isWhite, drop
    , path = this.path;

  // Only repath once. Prevent repath more.
  if (this._hasRepath_) return yield next;

  isWhite = _.some(options.whitelist, function (reg) {
    return toRegexp(reg).test(path);
  });
  if (isWhite) return yield next;

  drop = _.clone(_.find(drops, function (drop) {
    return !!drop.src.exec(path);
  }));

  if (drop) {
    match = drop.src.exec(path);
    if (_.isFunction(drop.dst)) {
      drop.dst = drop.dst.apply(null, [path].concat(match.slice(1)));
    }
    this.path = drop.dst.replace(/\$(\d+)|(?::(\w+))/g, function(str, n, name){
      if (name) return match[drop.map[name].index + 1];
      return match[n];
    });
    this._hasRepath_ = true;
    debug('rewrite %s -> %s', drop.src, this.path);
  }

  yield next;
}

function rewrite (drops, dst) {
  if (!_.isArray(drops)) {
    drops = [{ src: drops, dst: dst }];
  }

  drops.forEach(function (drop) {
    var keys = [];
    drop.src = toRegexp(drop.src, keys);
    drop.map = toMap(keys);
    drop.keys = keys;
  });

  if (!_params_.on) return noop;

  return function * (next) {
    yield core.call(this, drops, _params_, next);
  };
}

rewrite.config = function (options) {
  _params_ = _.extend({}, DEFAULTS, options);
};

module.exports = rewrite;



