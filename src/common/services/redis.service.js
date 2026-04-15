import { redisClient } from "../../DB/index.js";

export const TTL = async ({ key }) => {
  if (!key) {
    throw new Error("TTL function expects a key.");
  }
  return await redisClient.ttl(key);
};

export const SET = async ({ key, value, seconds }) => {
  if (!key) {
    throw new Error("SET function expects a key.");
  }
  if (!value) {
    throw new Error("SET function expects a value.");
  }
  if (seconds <= 0) {
    throw new Error("A key can not expire after a negative or zero seconds");
  }
  return seconds
    ? await redisClient.set(key, value, {
        expiration: { type: "EX", value: seconds },
      })
    : await redisClient.set(key, value);
};

export const EXPIRE = async ({ key, seconds }) => {
  if (!key) {
    throw new Error("EXPIRE function expects a key.");
  }
  if (!seconds) {
    throw new Error("EXPIRE function expects a seconds.");
  }
  if (seconds <= 0) {
    throw new Error("A key can not expire after a negative or zero seconds");
  }
  const expireResult = await redisClient.expire(key, seconds, "XX");
  return expireResult;
};
export const GET = async ({ key }) => {
  if (!key) {
    throw new Error("GET function expects a key.");
  }
  return await redisClient.get(key);
};
export const INCR = async ({ key }) => {
  if (!key) {
    throw new Error("INCR function expects a key.");
  }

  return await redisClient.incr(key);
};
export const INCRBY = async ({ key, value }) => {
  if (!key) {
    throw new Error("INCRBY function expects a key.");
  }
  if (!value) {
    throw new Error("INCRBY function expects an incrementation value.");
  }

  return await redisClient.incrBy(key, value);
};
export const MGET = async (keys = []) => {
  if (keys.length === 0) {
    throw new Error("MGET function expects an array of keys.");
  }
  return await redisClient.mGet(keys);
};
export const DEL = async (keys = []) => {
  if (keys.length === 0) {
    throw new Error("DEL function expects an array of keys.");
  }
  return await redisClient.del(keys);
};
export const UPDATE = async ({ key, value }) => {
  if (!key) {
    throw new Error("UPDATE function expects a key.");
  }
  if (!value) {
    throw new Error("UPDATE function expects a value.");
  }

  return await redisClient.set(key, value, { condition: "XX" });
};
export const PERSIST = async ({ key }) => {
  if (!key) {
    throw new Error("PERSIST function expects a key.");
  }
  return await redisClient.persist(key);
};
