import type { Comment, User } from "@lib/types";

export async function createComment(comment: Comment, recipeId: number, user?: User): Promise<Comment | null> {
    try {
        const request = {
            message: comment,
            userId: user?.id,
            username: user?.username,
        };

        const data = await fetch(
            `http://localhost:3000/recipes/${recipeId}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        );
        return await data.json();

    } catch (err) {
        console.log(err);
        return null;
    }
}
