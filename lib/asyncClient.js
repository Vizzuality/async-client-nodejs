'use strict';
var RedisChannel = require('./redisChannel');


const debug = require('debug')('AsynClient');
const redis = require('redis');

let createRedisClient = function(opts) {
    debug('Creating redis client');
    let redis = require('redis');
    return redis.createClient(opts);
};

let createAMQPClient = function(opts) {
    console.error('NOT IMPLEMENTED');
    throw new Error('AMQP Not implemented');
};

var AsyncClient = function(provider, opts) {
    this.provider = provider;
    this.opts = opts;
};

AsyncClient.REDIS = 'redis';
AsyncClient.AMQP = 'activeMQ';


AsyncClient.prototype.toChannel = function(channel) {
    let client = null;
    switch (this.provider) {
        case AsyncClient.REDIS:
            client = createRedisClient(this.opts);
            return new RedisChannel(client, channel);
        case AsyncClient.AMQP:
            client = createAMQPClient(this.opts);
            return null;
        default:
            console.error('Provider not found');
            return null;
    }
};

module.exports = AsyncClient;
