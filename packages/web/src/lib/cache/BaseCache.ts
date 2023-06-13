import { redisClient } from "@lib/config";

export default class BaseCache<T, X extends string = string> {
    private cache: typeof redisClient;
    private prefix: string;

    constructor(prefix = "") {
        this.cache = redisClient;
        this.prefix = prefix;
    }

    async get(key: X): Promise<T | null> {
        try {
            const data = await this.cache.get(`${this.prefix}${key}`);
            if (!data) return null;
            return JSON.parse(data);
        } catch (error) {
            console.error("Error occurred while getting data from cache:", error);
            throw error;
        }
    }

    async has(key: X): Promise<boolean> {
        try {
            return (await this.get(key)) !== null;
        } catch (error) {
            console.error("Error occurred while checking cache:", error);
            throw error;
        }
    }

    async set(key: X, data: T): Promise<void> {
        try {
            await this.cache.set(`${this.prefix}${key}`, JSON.stringify(data));
        } catch (error) {
            console.error("Error occurred while setting data in cache:", error);
            throw error;
        }
    }

    async delete(key: X): Promise<void> {
        try {
            await this.cache.del(`${this.prefix}${key}`);
        } catch (error) {
            console.error("Error occurred while deleting data from cache:", error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            await this.cache.flushAll();
        } catch (error) {
            console.error("Error occurred while clearing cache:", error);
            throw error;
        }
    }

    async getAll(): Promise<T[]> {
        try {
            const keys = await this.cache.keys(`${this.prefix}*`);
            const promises = keys.map((key) => this.get(key as X));
            const values = await Promise.all(promises);
            const data = values.filter((value) => value !== null) as T[];
            return data;
        } catch (error) {
            console.error("Error occurred while getting all data from cache:", error);
            throw error;
        }
    }

    async getKeys(): Promise<X[]> {
        try {
            const keys = await this.cache.keys(`${this.prefix}*`);
            return keys.map((key) => key.replace(this.prefix, "")) as X[];
        } catch (error) {
            console.error("Error occurred while getting keys from cache:", error);
            throw error;
        }
    }

    async getEverything(): Promise<{ [key: string]: T }> {
        try {
            const keys = await this.cache.keys(`${this.prefix}*`);
            const data: { [key: string]: T } = {};
            for (const key of keys) {
                const value = await this.get(key as X);
                if (value) data[key.replace(this.prefix, "")] = value;
            }
            return data;
        } catch (error) {
            console.error("Error occurred while getting everything from cache:", error);
            throw error;
        }
    }
}