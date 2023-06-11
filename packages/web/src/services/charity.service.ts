import type { Charity } from "@lib/types";
import { CharitiesCache } from "@lib/cache";

export async function getCharities(): Promise<Charity[]> {
    try {
        const cachedCharities = await CharitiesCache.getAll();

        if (cachedCharities.length > 0) {
            return cachedCharities;
        }

        const response = await fetch("http://localhost:3000/charities");
        if (!response.ok) {
            return [];
        }
        const charities = await response.json();
        charities.forEach(async (charity: Charity) => {
            await CharitiesCache.set(charity.id.toString(), charity);
        });
        return charities;
    } catch (error) {
        console.error(error);
        return [];
    }
}
