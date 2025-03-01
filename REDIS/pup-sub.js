//pub/sub ->

// -> publisher -> send -> channel -> subscriber will consume

import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => {
  console.log("Redis client error occured!", error);
});

async function testAdditionalFeatures() {
  try {
    await client.connect();

    const subscriber = client.duplicate(); //create a new client -> shares the same connection
    await subscriber.connect(); // connect to redis server for the subscriber

    await subscriber.subscribe("dummy-channel", (message, channel) => {
      console.log(`received message from ${channel}: ${message}`);
    });

    //publish the message to the dummy channel
    await client.publish("dummy-channel", "some dummy data from the publisher");
    await client.publish(
      "dummy-channel",
      "some new message from the publisher"
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await subscriber.unsubscribe("dummy-channel");

    await subscriber.quit();
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
}


testAdditionalFeatures()
