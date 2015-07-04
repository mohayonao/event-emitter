"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var EventEmitter = require("../index.js");

describe("EventEmitter", function() {
  describe("constructor()", function() {
    it("works", function() {
      var emitter = new EventEmitter();

      assert(emitter instanceof EventEmitter);
    });
  });
  describe("#listeners(event: string): Array<function>", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", fn1);

      assert.deepEqual(emitter.listeners("ping"), [ fn1, fn2 ]);
      assert.deepEqual(emitter.listeners("pong"), [ fn1 ]);
      assert.deepEqual(emitter.listeners("pang"), []);
    });
  });
  describe("#addListener(event: string, listener: function): self", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", "pong");

      emitter.emit("ping", 1);
      emitter.emit("pong", 2);
      emitter.emit("ping", 3);

      assert(fn1.callCount === 2);
      assert(fn1.args[0][0] === 1);
      assert(fn1.args[1][0] === 3);
      assert(fn2.callCount === 2);
      assert(fn2.args[0][0] === 1);
      assert(fn2.args[1][0] === 3);

      assert(emitter.on === emitter.addListener);
    });
  });
  describe("#once(event: string, listener: function): self", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.once("ping", fn1);
      emitter.once("ping", fn2);
      emitter.once("pong", "pong");

      emitter.emit("ping", 1);
      emitter.emit("pong", 2);
      emitter.emit("ping", 3);

      assert(fn1.callCount === 1);
      assert(fn1.args[0][0] === 1);
      assert(fn2.callCount === 1);
      assert(fn2.args[0][0] === 1);
    });
  });
  describe("removeListener(event: string, listener: function): self", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", fn1);

      emitter.removeListener("ping", fn1);
      emitter.removeListener("pong", fn2);
      emitter.removeListener("ping", "pong");

      assert.deepEqual(emitter.listeners("ping"), [ fn2 ]);
      assert.deepEqual(emitter.listeners("pong"), [ fn1 ]);
      assert.deepEqual(emitter.listeners("pang"), []);
    });
    it("works with once", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.once("ping", fn1);
      emitter.once("ping", fn2);
      emitter.once("pong", fn1);

      emitter.removeListener("ping", fn1);
      emitter.removeListener("pong", fn2);
      emitter.removeListener("ping", "pong");

      assert.deepEqual(emitter.listeners("ping"), [ fn2 ]);
      assert.deepEqual(emitter.listeners("pong"), [ fn1 ]);
      assert.deepEqual(emitter.listeners("pang"), []);
    });
  });
  describe("#removeAllListeners([event: string]): self", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", fn1);

      emitter.removeAllListeners("ping");
      emitter.removeAllListeners("pang");

      assert.deepEqual(emitter.listeners("ping"), []);
      assert.deepEqual(emitter.listeners("pong"), [ fn1 ]);
      assert.deepEqual(emitter.listeners("pang"), []);
    });
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", fn1);

      emitter.removeAllListeners();

      assert.deepEqual(emitter.listeners("ping"), []);
      assert.deepEqual(emitter.listeners("pong"), []);
      assert.deepEqual(emitter.listeners("pang"), []);
    });
  });
  describe("#emit(event: string, arg1: any): self", function() {
    it("works", function() {
      var emitter = new EventEmitter();
      var fn1 = sinon.spy();
      var fn2 = sinon.spy();

      emitter.addListener("ping", fn1);
      emitter.addListener("ping", fn2);
      emitter.addListener("pong", "pong");

      emitter.emit("ping", 1);
      emitter.emit("pong", 2);
      emitter.emit("ping", 3);

      assert(fn1.callCount === 2);
      assert(fn1.args[0][0] === 1);
      assert(fn1.args[1][0] === 3);
      assert(fn2.callCount === 2);
      assert(fn2.args[0][0] === 1);
      assert(fn2.args[1][0] === 3);
    });
  });
});
