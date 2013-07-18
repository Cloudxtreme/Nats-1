/*
 *
 * (C) 2013, MangoRaft.
 *
 */
var util = require('util');
var fs = require('fs');
var path = require('path');
var events = require('events');
var exec = require('child_process').exec;
var nats = require('nats');

var Nats = module.exports = function(options) {
	events.EventEmitter.call(this);
	var self = this
	this.nats = require('nats').connect(options);
	this.nats.on('connect', function() {
		self.emit('ready')
	})
};

//
// Inherit from `events.EventEmitter`.
//
util.inherits(Nats, events.EventEmitter);

Nats.prototype.publish = function(subject, msg, reply) {
	this.nats.publish(subject, JSON.stringify(msg), reply)
}

Nats.prototype.subscribe = function(subject, fn) {
	return this.nats.subscribe(subject, function(msg, reply) {
		fn(JSON.parse(msg), reply)
	})
}
Nats.prototype.unsubscribe = function(sid) {
	this.nats.unsubscribe(sid);
}
