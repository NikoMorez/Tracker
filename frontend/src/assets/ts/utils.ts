export const allowedServices = ["Steam", "YouTube", "Discord", "Twitch", "TikTok"];

export const serviceColors: Record<string, { active: string; inactive: string }> = {
    YouTube: { active: "#FF0000", inactive: "#800000" },
    Discord: { active: "#5865F2", inactive: "#2C2F55" },
    Twitch: { active: "#9146FF", inactive: "#4B267E" },
    Steam: { active: "#2A475E", inactive: "#1B2838" },
    TikTok: { active: "#000000", inactive: "#1B2838" }
};

export const serviceDomains: Record<string, string[]> = {
    YouTube: ["youtube.com", "youtube.com"],
    Discord: ["discord.gg", "discord.com"],
    Twitch: ["twitch.tv"],
    Steam: ["steamcommunity.com"],
    TikTok: ["tiktok.com"]
};


