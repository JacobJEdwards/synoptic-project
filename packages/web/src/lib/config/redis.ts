import * as redis from "redis";
import RedisStore from "connect-redis";

// sessions and cache
export const redisClient = redis.createClient();

redisClient.connect().catch((err) => {
    console.log("Redis error: ", err);
});

export const redisStore = new RedisStore({
    client: redisClient,
    prefix: "recipe-session",
});
