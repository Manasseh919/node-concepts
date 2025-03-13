import Redis from "ioredis"
//redis client library for nodejs

const redis = new Redis()


async function ioRedisDemo(){
    try {
        await redis.set("key", "value");
        const value = await redis.get("key");
        console.log(value);
    } catch (error) {
        console.log(error)
    }finally{
        await redis.quit();
    }
}

//I am learning version control

ioRedisDemo();