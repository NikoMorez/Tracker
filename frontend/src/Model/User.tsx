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
    pageConfig: Record<string, Record<string, string>>;
}

export enum Region {
    NotDefined = "",
    Europe = "EUROPE",
    USA = "USA",
    Asia = "ASIA",
    Africa = "AFRICA",
    Australia = "AUSTRALIA"
}

export interface ServiceData {
    url: string;
    visible: boolean;
    order: number;
}
