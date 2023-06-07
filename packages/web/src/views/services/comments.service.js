export async function createComment(comment, recipeId, userId) {
    try {
        const request = {
            message: comment,
            userId,
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
