const co = require('co');

const Channel = function (client, channel) {
    this.client = client;
    this.channel = channel;

};

Channel.prototype.subscribe = function () {
    this.client.subscribe(this.channel);
};

Channel.prototype.on = function (key, callback) {
    this.client.on(key, (channel, message) => {
        co(function* () {
            yield callback(channel, message);
        }).then(() => {}, (err) => {
            throw err;
        });
    });
};

Channel.prototype.emit = function (value) {
    this.client.publish(this.channel, value);
};

module.exports = Channel;
