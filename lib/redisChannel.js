'use strict';
const debug = require('debug')('RedisChannel');
const co = require('co');

var Channel = function(client, channel){
    debug('Subscribe client to ' + channel + ' channel');
    this.client = client;
    this.channel = channel;

};

Channel.prototype.subscribe = function(){
    this.client.subscribe(this.channel);
};

Channel.prototype.on = function(key, callback){
    debug('Subscribe to '+ key + ' messages');
    this.client.on(key, function(channel, message){
        co(function *(){
            yield callback(channel, message);
        }).then(function(){}, function(err){
            throw err;
        });
    });
};

Channel.prototype.emit = function(value){
    debug('Emitting event in channel '+ this.channel);
    this.client.publish(this.channel, value);
};

module.exports = Channel;
