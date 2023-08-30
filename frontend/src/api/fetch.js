export const apiCaller = {
    callUsers: async (access_token) => {
        const users = await fetch("http://localhost:3030/api/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        });
        return await users.json();
    }
}