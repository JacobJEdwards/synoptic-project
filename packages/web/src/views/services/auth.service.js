export async function login(email, password) {
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function register(username, email, password, name) {
    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, name }),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
}
