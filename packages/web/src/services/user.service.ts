import { verifyToken } from "./auth.service";

export async function getProfile(jwt: string, userId: number) {
  try {
    const permission = await verifyToken(jwt, userId);
    if (!permission) {
      return null;
    }

    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
