import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) => {
  console.log("Redis client error occured!", error);
});

const redisDataStructures = async () => {
  try {
    await client.connect();
    console.log("connected to redis");

    //strings -> SET,GET,MSET,MGET
    await client.set("user:name", "Software Dev");
    const name = await client.get("user:name");
    console.log(name);

    await client.mSet([
      "user:email",
      "softdev@gmail.com",
      "user:age",
      "30",
      "user:country",
      "Japan",
    ]);
    const [email, age, country] = await client.mGet([
      "user:email",
      "user:age",
      "user:country",
    ]);
    console.log(email, age, country);

    //lists => LPUSH,RPUSH,LRANGE,LPOP,RPOP
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
};

redisDataStructures();
