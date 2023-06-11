import { redisClient } from "@lib/config";

export default class BaseCache<T, X extends string = string> {
    private cache: typeof redisClient;
    private prefix: string;

    constructor(prefix = "") {
        this.cache = redisClient;
        this.prefix = prefix;
    }

    async get(key: X): Promise<T | null> {
        const data = await this.cache.get(`${this.prefix}${key}`);
        if (!data) return null;
        return JSON.parse(data);
    }

    async has(key: X): Promise<boolean> {
        return (await this.get(key)) !== null;
    }

    async set(key: X, data: T): Promise<void> {
        await this.cache.set(`${this.prefix}${key}`, JSON.stringify(data));
    }

    async delete(key: X): Promise<void> {
        await this.cache.del(`${this.prefix}${key}`);
    }

    async clear(): Promise<void> {
        await this.cache.flushAll();
    }

    async getAll(): Promise<T[]> {
        const keys = await this.cache.keys(`${this.prefix}*`);
        const data: T[] = [];
        for (const key of keys) {
            const value = await this.get(key as X);
            if (value) data.push(value);
        }
        return data;
    }

    async getKeys(): Promise<X[]> {
        const keys = await this.cache.keys(`${this.prefix}*`);
        return keys.map((key) => key.replace(this.prefix, "")) as X[];
    }

    async getEverything(): Promise<{ [key: string]: T }> {
        const keys = await this.cache.keys(`${this.prefix}*`);
        const data: { [key: string]: T } = {};
        for (const key of keys) {
            const value = await this.get(key as X);
            if (value) data[key.replace(this.prefix, "")] = value;
        }
        return data;
    }
}
