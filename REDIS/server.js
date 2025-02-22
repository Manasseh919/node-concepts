import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) => {
  console.log("Redis client error occured!", error);
});

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("connected to redis");

    await client.set("key", "myname");
    const extractValue = await client.get("key");

    console.log(extractValue);

    const deleteCount = await client.del("key");
    console.log(deleteCount);

    const extractUpdatedValue = await client.get("key");
    console.log(extractUpdatedValue);

    await client.set("count", "100");
    const incrementcount = await client.incr("count");
    console.log(incrementcount);

    const decremetnCount = await client.decr("count");
    console.log(decremetnCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
