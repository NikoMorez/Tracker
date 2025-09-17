export interface User {
    id: string;
    identity : UserIdentity
    region : Region;


    userProfile : UserProfile

}

export interface UserIdentity {
    username: string;
    password: string;
    email: string;
    role: string;
}



export interface UserProfile {
    shownUsername: string;
    avatar: string;
    bio: string;
    textColor: string;
    backgroundImage?: string;
    textColorSmall?: string;
    backgroundImageSmall?: string;

    serviceNames: Record<string, ServiceData>;
    pageConfig: Record<string, GameConfig>;
    favoriteItem?: FavoriteItem;
}

export enum Region {
    NOTDEFINED = "",
    EUROPE = "EUROPE",
    USA = "USA",
    ASIA = "ASIA",
    AFRICA = "AFRICA",
    AUSTRALIA = "AUSTRALIA"
}

export interface ServiceData {
    url: string;
    visible: boolean;
    order: number;
    externalId: string;
    oauthToken : string;
    refreshToken : string;
}

export type FavoriteItem = {
    type: "game" | "achievement" | "ranking";
    id: string;
    serviceName: string;
};

export interface GameConfig {
    serviceName: string;
    gameId: string;
    gameName: string;
    iconUrl?: string;
    visible: boolean;
    order: number;
    playtime: number;
    features: Array<"achievements" | "ranking">;
}
