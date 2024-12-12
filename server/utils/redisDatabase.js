const Redis = require("ioredis")

const client = new Redis("rediss://default:AV5UAAIjcDE1MTE5YTliMzc4NDE0ODk0OWI1OGVmODI4YWU0YmY4OHAxMA@living-flamingo-24148.upstash.io:6379");

module.exports = client