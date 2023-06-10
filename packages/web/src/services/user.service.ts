import { User } from "@/lib/types";

export async function getProfile(jwt: string): Promise<User | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();

    } catch (error) {
        return null;
    }
}
