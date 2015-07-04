"use strict";

function EventEmitter() {
  this._callbacks = {};
}

EventEmitter.prototype.listeners = function(event) {
  if (this._callbacks.hasOwnProperty(event)) {
    return this._callbacks[event].map(function(listener) {
      return listener.listener || listener;
    }).reverse();
  }

  return [];
};

EventEmitter.prototype.addListener = function(event, listener) {
  if (typeof listener === "function") {
    if (!this._callbacks.hasOwnProperty(event)) {
      this._callbacks[event] = [ listener ];
    } else {
      this._callbacks[event].unshift(listener);
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(event, listener) {
  var _this, func;

  _this = this;

  if (typeof listener === "function") {
    func = function(arg1) {
      _this.removeListener(event, func);
      listener(arg1);
    };

    func.listener = listener;

    this.addListener(event, func);
  }

  return this;
};

EventEmitter.prototype.removeListener = function(event, listener) {
  var listeners, i;

  if (typeof listener === "function" && this._callbacks.hasOwnProperty(event)) {
    listeners = this._callbacks[event];

    for (i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === listener || listeners[i].listener === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(event) {
  if (typeof event === "undefined") {
    this._callbacks = {};
  } else if (this._callbacks.hasOwnProperty(event)) {
    delete this._callbacks[event];
  }

  return this;
};

EventEmitter.prototype.emit = function(event, arg1) {
  var listeners, i;

  if (this._callbacks.hasOwnProperty(event)) {
    listeners = this._callbacks[event];

    for (i = listeners.length - 1; i >= 0; i--) {
      listeners[i](arg1);
    }
  }

  return this;
};

module.exports = EventEmitter;
