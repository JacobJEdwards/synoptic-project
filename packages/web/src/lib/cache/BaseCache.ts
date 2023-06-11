export default class BaseCache<T, X> {
    private cache: Map<T, X>;

    constructor() {
        this.cache = new Map<T, X>();
    }

    get(key: T): X | undefined {
        return this.cache.get(key);
    }

    set(key: T, value: X): void {
        this.cache.set(key, value);
    }

    remove(key: T): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    has(key: T): boolean {
        return this.cache.has(key);
    }

    getItems(): IterableIterator<[T, X]> {
        return this.cache.entries();
    }
}
