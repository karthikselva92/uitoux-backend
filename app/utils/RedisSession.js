//import getConfig from '../Config/index'
const RedisSession = require('redis-sessions') // https://www.npmjs.com/package/redis-sessions
var RedisSessionInstance = null

function initiateInstance() {
    try {
        if (!RedisSessionInstance) {
            RedisSessionInstance = new RedisSession({
                host: 'localhost',
                port: 6379
            });
            return RedisSessionInstance
        } else return RedisSessionInstance
    } catch (error) {
        throw error
    }
}

function createRedis(payload) {
    const {
        userId,
        additionalInfo,
        ip
    } = payload;
    return new Promise((resolve, reject) => {
        initiateInstance().create({
            app: 'Dipmenu',
            id: userId,
            ip: ip,
            d: additionalInfo
        }, function (err, resp) {
            if (err) {
                reject(err)
            }
            resolve(resp.token)
        })
    })
}

function getRedis(payload) {
    const {
        token
    } = payload
    return new Promise((resolve, reject) => {
        initiateInstance().get({
            app: 'Dipmenu',
            token: token
        }, function (err, resp) {
            if (err)
                resolve(false)
            if (Object.keys(resp).length > 0) {
                resolve(resp)
            } else resolve(false)

        })
    })
}

function killRedis(payload) {
    const {
        token,
    } = payload
    return new Promise((resolve, reject) => {
        Redis.initiateInstance().kill({
            app: 'Dipmenu',
            token: token
        }, function (err, resp) {
            if (err)
                reject(err)
            resolve(resp)
        })
    })
}

module.exports = {
    createRedis,
    getRedis,
    killRedis
};