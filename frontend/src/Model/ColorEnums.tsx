export enum BackgroundColor {
    DARK_BLUE = "#1E2A38",
    DARK_GREEN = "#1F3D2F",
    DARK_GRAY = "#2A2A2A",
    CHARCOAL = "#3B3B3B",
    SLATE = "#37474F",
    BURGUNDY = "#4A2C3B",
    TEAL = "#295757"
}

export const BackgroundColorLabels: Record<BackgroundColor, string> = {
    [BackgroundColor.DARK_BLUE]: "Dunkelblau",
    [BackgroundColor.DARK_GREEN]: "Dunkelgrün",
    [BackgroundColor.DARK_GRAY]: "Dunkelgrau",
    [BackgroundColor.CHARCOAL]: "Anthrazit",
    [BackgroundColor.SLATE]: "Slate-Grau",
    [BackgroundColor.BURGUNDY]: "Burgunderrot",
    [BackgroundColor.TEAL]: "Petrol"
};



export enum TextColor {
    WHITE = "#FFFFFF",
    BLACK = "#000000",
    RED = "#FF0000",
    GREEN = "#00FF00",
    BLUE = "#0000FF",
    CYAN = "#00FFFF",
    MAGENTA = "#FF00FF",
    YELLOW = "#FFFF00",
    ORANGE = "#FFA500",
    PINK = "#FF69B4",
    LIME = "#BFFF00"
}

export const TextColorLabels: Record<TextColor, string> = {
    [TextColor.WHITE]: "Weiß",
    [TextColor.BLACK]: "Schwarz",
    [TextColor.RED]: "Rot",
    [TextColor.GREEN]: "Grün",
    [TextColor.BLUE]: "Blau",
    [TextColor.CYAN]: "Cyan",
    [TextColor.MAGENTA]: "Magenta",
    [TextColor.YELLOW]: "Gelb",
    [TextColor.ORANGE]: "Orange",
    [TextColor.PINK]: "Pink",
    [TextColor.LIME]: "Lime"
};
