# Publish / Subscribe Client (Support to generators)

Now only support to Redis. In the future we'll add support to amqp protocol.

## Install

````
npm install --save vizz.async-client-nodejs
````

## Use
You have examples in ``examples`` folder. To execute example: ```node example/redis.js```

Code:
````
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
    host: 'localhost' // redis url
});
var asyncClientSubscriber = new AsyncClient(AsyncClient.REDIS, {
    host: 'localhost'// redis url
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

````
