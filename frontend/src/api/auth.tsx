import axios from "axios";


const api = axios.create({
    baseURL: "/api/auth",
    headers: { "Content-Type": "application/json" },
});


export async function login(username: string, password: string): Promise<string | null> {
    try {
        const res = await api.post("/login", { username, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        return token;
    } catch {
        return null;
    }
}


export async function register(username: string, password: string, email?: string): Promise<boolean> {
    try {
        const res = await api.post("/register", { username, password, email });
        return res.status === 200;
    } catch {
        return false;
    }
}

export async function getMe(): Promise<string | null> {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const res = await api.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
}


export function logout() {
    localStorage.removeItem("token");
}
