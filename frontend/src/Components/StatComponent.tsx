import { useEffect, useState } from "react";
import type { User, GameConfig } from "../Model/User.tsx";
import axios from "axios";

interface PlayerAchievement {
    apiname: string;
    name: string;
    icon: string;
    achieved: boolean;
}

type StatComponentProps = {
    user: User;
};

export default function StatComponent({ user }: StatComponentProps) {
    const [achievementsMap, setAchievementsMap] = useState<Record<string, PlayerAchievement[]>>({});
    const [totalAchievementsMap, setTotalAchievementsMap] = useState<Record<string, number>>({});



    const games: GameConfig[] = Object.values(user.userProfile.pageConfig)
        .filter(g => g.visible)
        .sort((a, b) => a.order - b.order);

    useEffect(() => {
        const steamId = user.userProfile.serviceNames?.Steam?.externalId;
        if (!steamId) return;

        const fetchAchievements = async () => {
            const newMap: Record<string, PlayerAchievement[]> = {};
            const totalMap: Record<string, number> = {};

            for (const game of games) {
                if (!game.features.includes("achievements")) continue;

                try {
                    const achRes = await axios.get(`/api/steam/achievements/${steamId}/${game.gameId}`);
                    const playerAchievements: { apiname: string; achieved: boolean }[] = achRes.data.achievements;

                    const schemaRes = await axios.get(`/api/steam/schema/${game.gameId}`);
                    const schemaAchievements: { name: string; displayName: string; icon: string; icongray: string; hidden?: number; description?: string }[] =
                        schemaRes.data?.game?.availableGameStats?.achievements
                        ?? schemaRes.data?.availableGameStats?.achievements
                        ?? [];

                    totalMap[game.gameId] = schemaAchievements.length;


                    const schemaMap: Record<string, { name: string; icon: string }> = {};
                    schemaAchievements.forEach(a => {
                        schemaMap[a.name] = {
                            name: a.displayName || a.name,
                            icon: a.icon || ""
                        };
                    });

                    const schemaAchievementsMap: Record<string, number> = {};
                    schemaAchievementsMap[game.gameId] = schemaAchievements.length;



                    newMap[game.gameId] = playerAchievements
                        .filter(a => a.achieved)
                        .map(a => ({
                            ...a,
                            name: schemaMap[a.apiname]?.name ?? a.apiname,
                            icon: schemaMap[a.apiname]?.icon ?? ""
                        }));
                } catch (err) {
                    console.error("Fehler beim Laden der Achievements für", game.gameName, err);
                    newMap[game.gameId] = [];
                }
            }

            setAchievementsMap(newMap);
            setTotalAchievementsMap(totalMap);
        };

        fetchAchievements();
    }, [
        user.userProfile.serviceNames?.Steam?.externalId,
        JSON.stringify(games.map(g => ({ gameId: g.gameId, features: g.features, visible: g.visible, order: g.order })))
    ]);


    return (
        <div className="flex flex-col gap-6">
            {games.map(game => (
                <div
                    key={game.gameId}
                    className="relative rounded-lg overflow-hidden shadow-lg h-60 flex flex-col justify-between text-white"
                    style={{
                        backgroundImage: game.iconUrl ? `url(${game.iconUrl})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: game.iconUrl ? undefined : "#4f46e5",
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>

                    <div className="relative z-10 p-4 flex justify-between items-start">
                        <h3 className="text-xl font-bold">{game.gameName}</h3>
                        {game.features.includes("ranking") && (
                            <div className="ml-auto flex items-center space-x-2">
                                Rank
                            </div>
                        )}
                    </div>
                    <div className="relative z-10 p-2 overflow-x-auto overflow-y-hidden bg-black/40 flex gap-2">

                        {game.features.includes("achievements") && (
                            <span className="text-sm text-gray-200 ">
                                 {achievementsMap[game.gameId]?.length ?? 0} / {totalAchievementsMap[game.gameId] ?? 0} Achievements
                            </span>
                        )}
                        {achievementsMap[game.gameId]?.length ? (
                            achievementsMap[game.gameId].map(ach => (
                                <div key={ach.apiname} className="flex flex-col items-center min-w-[75px]">
                                    {ach.icon ? (
                                        <img src={ach.icon} alt={ach.name} className="w-12 h-12 rounded" />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-xs">?</div>
                                    )}
                                    <span className="text-xs text-center mt-1">{ach.name}</span>
                                </div>
                            ))
                        ) : (
                            <span className="text-gray-300 text-sm"></span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
