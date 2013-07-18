var Nats = require('../')

var nats = new Nats({})
nats.on('ready', function() {
	nats.publish('foo', 'Hello World!');
})
var sid = nats.subscribe('foo', function(msg) {
	console.log('Received a message: ' + msg);
	nats.unsubscribe(sid)
});
