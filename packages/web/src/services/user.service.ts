import { User } from "@/lib/types";

export async function getProfile(
    jwt: string,
    userId: number
): Promise<User | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log(response);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}
