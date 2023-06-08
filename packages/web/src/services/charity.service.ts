import type { Charity } from "@lib/types";

export async function getCharities(): Promise<Charity[]> {
    try {
        const response = await fetch("http://localhost:3000/charities");
        if (!response.ok) {
            return [];
        }
        const charities = await response.json();
        return charities;
    } catch (error) {
        console.error(error);
        return [];
    }
}
