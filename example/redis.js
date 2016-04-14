'use strict';
const CHANNEL = 'myChannel';

function* iter(number) {
    for (var i = 0; i < number; i++) {
        yield i;
    }
}

function* gen(number) {
    for (var val of iter(number)) {
        console.log(val);
    }
}

var AsyncClient = require('../index');

var asyncClientPublish = new AsyncClient(AsyncClient.REDIS, {
    host: 'localhost'
});
var asyncClientSubscriber = new AsyncClient(AsyncClient.REDIS, {
    host: 'localhost'
});

var channelSubscribe = asyncClientSubscriber.toChannel(CHANNEL);
channelSubscribe.on('message', function*(channel, message) {
    console.log('Message received: ' + message);
    yield gen(message);
    console.log('Message completed');
});
channelSubscribe.subscribe();

asyncClientPublish.toChannel(CHANNEL).emit(2);
asyncClientPublish.toChannel(CHANNEL).emit(5);
