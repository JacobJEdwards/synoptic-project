import * as redis from "redis";
import RedisStore from "connect-redis";

// sessions
const redisClient = redis.createClient();

redisClient.connect().catch((err) => {
    console.log("Redis error: ", err);
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "recipe-session",
});

export default redisStore;
