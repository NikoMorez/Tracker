import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../SortableItem";
import { rankingSupportedGames } from "../../../config/gameFeatures.ts";
import type { FavoriteItem, GameConfig, User } from "../../../Model/User.tsx";
import { useSnackbar } from "../../snackBar/useSnackbar.ts";


type pageProps = {
    User: User;
    onUpdate: () => void;
};

export function PageConfig({ User, onUpdate }: pageProps) {
    const initialGames: GameConfig[] = useMemo(
        () => Object.values(User.userProfile.pageConfig) as GameConfig[],
        [User.userProfile.pageConfig]
    );

    const [formData, setFormData] = useState<User>(User);
    const [games, setGames] = useState<GameConfig[]>(initialGames);
    const [showWizard, setShowWizard] = useState(false);
    const [availableGames, setAvailableGames] = useState<GameConfig[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGames, setSelectedGames] = useState<
        Map<string, Array<"achievements" | "ranking">>
    >(new Map());
    const [isDirty, setIsDirty] = useState(false);
    const { showSnackbar } = useSnackbar();

    const sensors = useSensors(useSensor(PointerSensor));


    useEffect(() => {
        setGames(initialGames);
        setFormData(User);
        setIsDirty(false);
    }, [initialGames, User]);

    const toggleVisible = (gameId: string) => {
        const updatedGames = games.map(g =>
            g.gameId === gameId ? { ...g, visible: !g.visible } : g
        );
        setGames(updatedGames);


        setFormData(prev => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                pageConfig: Object.fromEntries(updatedGames.map(g => [g.gameId, g])),
                favoriteItem: prev.userProfile.favoriteItem,
            },
        }));

        setIsDirty(true);
    };

    const removeGame = (gameId: string) => {
        const updatedGames = games.filter(g => g.gameId !== gameId);
        setGames(updatedGames);
        setFormData(prev => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                pageConfig: Object.fromEntries(updatedGames.map(g => [g.gameId, g])),
                favoriteItem: prev.userProfile.favoriteItem,
            },
        }));
        setIsDirty(true);
    };



    useEffect(() => {
        const fetchSteamGames = async () => {
            const steamId = formData.userProfile.serviceNames?.Steam?.externalId;
            if (!steamId) return;
            try {
                const response = await axios.get(`/api/steam/games/${steamId}`);
                const data = response.data;
                const list = data.games ?? data.response?.games ?? [];
                const mapped: GameConfig[] = list.map((g: any, index: number) => ({
                    serviceName: "steam",
                    gameId: g.appid.toString(),
                    gameName: g.name,
                    iconUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
                    visible: true,
                    order: games.length + index,
                    playtime: g.playtime_forever ?? 0,
                    features: ["achievements"] as Array<"achievements" | "ranking">,
                }));
                setAvailableGames(mapped);
            } catch (error) {
                console.error("Fehler beim Laden der Steam-Spiele:", error);
            }
        };
        fetchSteamGames();
    }, [formData.userProfile.serviceNames?.Steam?.externalId]);

    const filteredGames = availableGames.filter((g) =>
        g.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openWizard = () => setShowWizard(true);

    const addSelectedGames = () => {
        const newGames = availableGames
            .filter((g) => selectedGames.has(g.gameId))
            .map((g) => ({
                ...g,
                features: selectedGames.get(g.gameId) || [],
            }));
        const updatedGames = [...games, ...newGames];
        setGames(updatedGames);
        setFormData((prev) => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                pageConfig: Object.fromEntries(updatedGames.map((g) => [g.gameId, g])),
            },
        }));
        setSelectedGames(new Map());
        setShowWizard(false);
        setIsDirty(true);
    };

    const handleFeatureChange = (
        gameId: string,
        feature: "achievements" | "ranking"
    ) => {
        const updatedGames = games.map((g) => {
            if (g.gameId === gameId) {
                if (feature === "ranking" && !rankingSupportedGames[g.serviceName]?.includes(g.gameId)) return g;
                const newFeatures = g.features.includes(feature)
                    ? g.features.filter((f) => f !== feature)
                    : [...g.features, feature];
                return { ...g, features: newFeatures };
            }
            return g;
        });
        setGames(updatedGames);
        setFormData((prev) => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                pageConfig: Object.fromEntries(updatedGames.map((g) => [g.gameId, g])),
            },
        }));
        setIsDirty(true);
    };

    const handleFavorite = (
        gameId: string,
        type: "game" | "achievement" | "ranking"
    ) => {
        const fav: FavoriteItem = { type, id: gameId, serviceName: "steam" };
        setFormData((prev) => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                favoriteItem: fav,
            },
        }));
        setIsDirty(true);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        const oldIndex = games.findIndex((g) => g.gameId === active.id);
        const newIndex = games.findIndex((g) => g.gameId === over.id);
        const newOrder = arrayMove(games, oldIndex, newIndex).map((g, idx) => ({
            ...g,
            order: idx,
        }));
        setGames(newOrder);
        setFormData((prev) => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                pageConfig: Object.fromEntries(newOrder.map((g) => [g.gameId, g])),
            },
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/users/${formData.id}`, {
                ...formData,
                userProfile: {
                    ...formData.userProfile,
                    pageConfig: games,
                    favoriteItem: formData.userProfile.favoriteItem,
                },
            });
            onUpdate()
            showSnackbar("Änderungen erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={openWizard}
                    >
                        Spiel hinzufügen
                    </button>

                </div>

                <button
                    className={`px-4 py-2 rounded ${isDirty ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-800 cursor-not-allowed"}`}
                    onClick={handleSave}
                    disabled={!isDirty}
                >
                    Speichern
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={games.map((g) => g.gameId)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul>
                        {games.map((game) => (
                            <SortableItem
                                key={game.gameId}
                                game={game}
                                removeGame={removeGame}
                                toggleVisible={toggleVisible}
                                handleFeatureChange={handleFeatureChange}
                                handleFavorite={handleFavorite}
                                favoriteItem={formData.userProfile.favoriteItem}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>


            {showWizard && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 z-1250 text-blue-500">
                    <div className="bg-white w-full max-w-4xl h-[80vh] rounded shadow-lg flex flex-col">

                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Spiele auswählen</h2>
                            <button className="text-red-500" onClick={() => setShowWizard(false)}>✕</button>
                        </div>


                        <div className="p-4 border-b">
                            <input
                                type="text"
                                placeholder="Spiel suchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>


                        <div className="flex-1 overflow-y-auto p-4">
                            <ul>
                                {filteredGames.map((g) => (
                                    <li key={g.gameId} className="flex items-center p-2 border-b hover:bg-gray-100">
                                        <input
                                            type="checkbox"
                                            checked={selectedGames.has(g.gameId)}
                                            onChange={() => {
                                                const copy = new Map(selectedGames);
                                                if (copy.has(g.gameId)) copy.delete(g.gameId);
                                                else copy.set(g.gameId, ["achievements"] as Array<"achievements" | "ranking">);
                                                setSelectedGames(copy);
                                            }}
                                            className="mr-2"
                                        />
                                        <img src={g.iconUrl} alt={g.gameId} width={50} className="mr-2" />
                                        <span>{g.gameName}</span>

                                        {selectedGames.has(g.gameId) && (
                                            <div className="ml-auto flex items-center space-x-2">
                                                <label className="flex items-center space-x-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedGames.get(g.gameId)?.includes("achievements")}
                                                        onChange={() => {
                                                            const copy = new Map(selectedGames);
                                                            const features = copy.get(g.gameId) || [];
                                                            if (features.includes("achievements")) {
                                                                copy.set(g.gameId, features.filter((f) => f !== "achievements"));
                                                            } else {
                                                                copy.set(g.gameId, [...features, "achievements"]);
                                                            }
                                                            setSelectedGames(copy);
                                                        }}
                                                    />
                                                    <span>Achievements</span>
                                                </label>


                                                {rankingSupportedGames[g.serviceName]?.includes(g.gameId) && (
                                                    <label className="flex items-center space-x-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedGames.get(g.gameId)?.includes("ranking")}
                                                            onChange={() => {
                                                                const copy = new Map(selectedGames);
                                                                const features = copy.get(g.gameId) || [];
                                                                if (features.includes("ranking")) {
                                                                    copy.set(g.gameId, features.filter((f) => f !== "ranking"));
                                                                } else {
                                                                    copy.set(g.gameId, [...features, "ranking"]);
                                                                }
                                                                setSelectedGames(copy);
                                                            }}
                                                        />
                                                        <span>Ranking</span>
                                                    </label>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={addSelectedGames}
                            >
                                Hinzufügen
                            </button>
                            <button
                                className="ml-2 px-4 py-2 bg-gray-200 rounded"
                                onClick={() => {
                                    setShowWizard(false);
                                }}
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
