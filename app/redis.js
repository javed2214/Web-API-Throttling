const redis = require('redis')
const redisPORT = process.env.REDIS_PORT || 6379
const redisHOST = process.env.REDIS_HOST
const redisClient = redis.createClient(redisPORT, redisHOST)

const connectRedis = () => {
    redisClient.on('error', () => {
        console.log('Error in Connecting Redis')
    })
    redisClient.on('connect', () => {
        console.log('Redis Connected Successfully')
    })
}

const rateLimitter = (req, res, next) => {
    const ip = req.ip
    redisClient.incr(ip)
    try{
        redisClient.get(ip, (err, val) => {
            count = parseInt(val)
            if(count == 1) redisClient.expire(ip, 20)
            if(count > 10) {
                return res.status(501).json({
                    Error: 'To many API Calls!',
                    Port: process.env.PORT
                })
            }
            else next()
        })
    } catch(err) {
        return res.json({
            error: 'Internal Server Error'
        })
    }
}


module.exports = { connectRedis, rateLimitter }