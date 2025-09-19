export interface GameSpotNews {
    id: number;
    title: string;
    authors: string;
    deck: string;
    body: string;
    lede: string;
    publishDate: string;
    updateDate: string;
    siteDetailUrl: string;
    image: Image;
    categories: Category[];
    associations: Association[];
}

export interface Image {
    square_tiny: string;
    screen_tiny: string;
    square_small: string;
    original: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Association {
    id: number;
    name: string;
    api_detail_url: string;
    guid: string;
}
