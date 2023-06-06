import redis from "redis";
import RedisStore from "connect-redis";

// sessions
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.connect().catch((err) => {
  console.log("Redis error: ", err);
});

const redisStore = new RedisStore({
  client: redisClient,
  logErrors: true,
  prefix: "recipe-session",
});

export default redisStore;
