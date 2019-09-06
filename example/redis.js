const CHANNEL = 'myChannel';

function* iter(number) {
    for (let i = 0; i < number; i++) {
        yield i;
    }
}

function* gen(number) {
    for (const val of iter(number)) {
        console.log(val);
    }
}

const AsyncClient = require('../index');

const asyncClientPublish = new AsyncClient(AsyncClient.REDIS, {
    host: 'localhost'
});
const asyncClientSubscriber = new AsyncClient(AsyncClient.REDIS, {
    host: 'localhost'
});

const channelSubscribe = asyncClientSubscriber.toChannel(CHANNEL);
channelSubscribe.on('message', function* (channel, message) {
    console.log(`Message received: ${message}`);
    yield gen(message);
    console.log('Message completed');
});
channelSubscribe.subscribe();

asyncClientPublish.toChannel(CHANNEL).emit(2);
asyncClientPublish.toChannel(CHANNEL).emit(5);
