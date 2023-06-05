export async function login(email, password) {
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("in login");
        console.log(data);

        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}
