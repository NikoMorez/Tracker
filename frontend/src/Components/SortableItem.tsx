import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { rankingSupportedGames } from "../config/gameFeatures.ts";
import type {FavoriteItem, GameConfig} from "../Model/User.tsx";
import {Switch} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

type SortableItemProps = {
    game: GameConfig;
    toggleVisible: (id: string) => void;
    removeGame: (id: string) => void;
    handleFeatureChange: (id: string, feature: "achievements" | "ranking") => void;
    handleFavorite: (id: string, type: "game" | "achievement" | "ranking") => void;
    favoriteItem?: FavoriteItem;
};

export function SortableItem({game, toggleVisible, handleFeatureChange, handleFavorite, favoriteItem, removeGame
                             }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: game.gameId,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : "auto",
    };

    return (
        <li ref={setNodeRef} style={style} className="mb-4 rounded overflow-hidden relative shadow-lg">
            <div
                className="relative p-4 text-white min-h-[100px] flex flex-col justify-between rounded-lg overflow-hidden"
                style={{
                    backgroundImage: game.iconUrl ? `url(${game.iconUrl})` : undefined,
                    backgroundColor: game.iconUrl ? undefined : "#4f46e5",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: !game.visible ? "grayscale(100%) brightness(50%)" : "none"
                }}
            >
                <h3 className="text-xl font-bold mb-2 opacity-80 bg-gray-500 rounded-lg p-2 flex justify-between items-center">
                    {game.gameName}

                    <span {...listeners} {...attributes} className="cursor-move ml-2"><FormatListBulletedIcon/></span>
                    <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => removeGame(game.gameId)}
                    >
                        <DeleteIcon></DeleteIcon>
                    </button>
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 bg-gray-500 rounded-lg p-2">
                        <Switch
                            checked={game.visible}
                            onChange={() => toggleVisible(game.gameId)}
                            color={game.visible ? "success" : "default"}
                        />
                        <label className="flex items-center space-x-1">
                            <input
                                type="checkbox"
                                checked={game.features.includes("achievements")}
                                onChange={() => handleFeatureChange(game.gameId, "achievements")}
                            />
                            <span>Achievements</span>
                        </label>
                        {rankingSupportedGames[game.serviceName]?.includes(game.gameId) && (
                            <label className="flex items-center space-x-1">
                                <input
                                    type="checkbox"
                                    checked={game.features.includes("ranking")}
                                    onChange={() => handleFeatureChange(game.gameId, "ranking")}
                                />
                                <span>Ranking</span>
                            </label>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-500 rounded-lg p-2">
                        <button onClick={() => handleFavorite(game.gameId, "game")}>
                            {favoriteItem?.id === game.gameId ? "Favorit" : "Kein Favorit"}
                        </button>
                    </div>
                </div>
            </div>
        </li>

    );
}
