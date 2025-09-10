import axios from "axios";
import type { User } from "../Model/User.tsx";

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
    } catch (err) {
        console.error("Login failed", err);
        return null;
    }
}

export async function register(username: string, password: string, email?: string): Promise<boolean> {
    try {
        const res = await api.post("/register", { username, password, email });
        return res.status === 200;
    } catch (err) {
        console.error("Registration failed", err);
        return false;
    }
}

export async function getMe(): Promise<User | null> {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const res = await api.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data as User;
    } catch (err) {
        console.error("Fetching user failed", err);
        localStorage.removeItem("token");
        return null;
    }
}

export function logout() {
    localStorage.removeItem("token");
}
