import { redisClient } from "@lib/config";

export default class BaseCache<T> {
    private cache: typeof redisClient;
    private prefix: string;

    constructor(prefix = "") {
        this.cache = redisClient;
        this.prefix = prefix;
    }

    async get(key: string): Promise<T | null> {
        const data = await this.cache.get(`${this.prefix}${key}`);
        if (!data) return null;
        return JSON.parse(data);
    }

    async has(key: string): Promise<boolean> {
        return (await this.get(key)) !== null;
    }

    async set(key: string, data: T): Promise<void> {
        await this.cache.set(`${this.prefix}${key}`, JSON.stringify(data));
    }

    async delete(key: string): Promise<void> {
        await this.cache.del(`${this.prefix}${key}`);
    }

    async clear(): Promise<void> {
        await this.cache.flushAll();
    }

    async getAll(): Promise<T[]> {
        const keys = await this.cache.keys(`${this.prefix}*`);
        const data: T[] = [];
        for (const key of keys) {
            const value = await this.get(key);
            if (value) data.push(value);
        }
        return data;
    }
}
