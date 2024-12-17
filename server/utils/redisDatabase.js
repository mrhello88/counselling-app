const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_STRING);

module.exports = client;
