/**
 * helper function to allow caching
 */
export default function deepEqual(x: any, y: any): boolean {
    const tx = typeof x;
    const ty = typeof y;

    return x && y && tx === "object" && tx === ty
        ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
}
