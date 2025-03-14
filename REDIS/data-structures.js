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
    // console.log(name);

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
    // console.log(email, age, country);

    //lists => LPUSH,RPUSH,LRANGE,LPOP,RPOP

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);
    // const extractAllNotes = await client.lRange("notes", 0, -1);
    // console.log(extractAllNotes);

    // const firstNOte = await client.lPop("notes");
    // console.log(firstNOte);

    // const remainingNOtes = await client.lRange("notes", 0, -1);
    // console.log(remainingNOtes)

    //sets -> SADD,SMEMBERS,SISMEMBER,SREM

    // await client.sAdd('user:nickName',['john','varun','xyz'])
    // const extractUserUniquenames = await client.sMembers('user:nickName')
    // console.log(extractUserUniquenames)

    // const isVarunOneOfUserNickName = await client.sIsMember('user:nickName','john')
    // console.log(isVarunOneOfUserNickName)

    // await client.sRem('user:nickName','xyz')
    // const getUPdatedUserNickNames = await client.sMembers("user:nickName")
    // console.log(getUPdatedUserNickNames)

    //sorted sets
    //ZADD, ZRANGE,ZRANK,ZREM

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "cart 3",
    //   },
    // ]);
    // const getTopCartItems = await client.zRange('cart',0,-1)
    // console.log(getTopCartItems)

    // const extractAllcartItemsithscore = await client.zRangeWithScores('cart',0,-1)
    // console.log(extractAllcartItemsithscore)

    // const cartTWoRank = await client.zRank('cart','cart 2')
    // console.log(cartTWoRank)


    //hashes => HSET,HGET,HGETALL, HDEL

    await client.hSet('product:1',{
      name:"Product 1",
      description:"product one description",
      rating:'5',
    })

    const getProductRating = await client.hGet('product:1',"rating")
    console.log(getProductRating)

    const getProductDetails = await client.hGetAll('product:1')
    console.log(getProductDetails)


    await client.hDel('product:1','rating')
    const updatedProductDetails = await client.hGetAll('product:1')
    console.log(updatedProductDetails)

  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
};

redisDataStructures();
