import type { Comment, User } from "@lib/types";

export async function createComment(
  message: string,
  recipeId: number,
  user?: User
): Promise<Comment | null> {
  try {
    const userId = user?.id;
    const username = user?.username;

    const request = {
      message: message,
      userId: userId,
      username: username,
    };


    const response = await fetch(
      `http://localhost:3000/recipes/${recipeId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
