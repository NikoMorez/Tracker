import { useEffect, useState } from "react";
import axios from "axios";
import type {GameSpotNews} from "../Model/GameSpotNews.tsx";
import {useSnackbar} from "../Components/snackBar/useSnackbar.ts";

export default function HomePage() {
    const [news, setNews] = useState<GameSpotNews[]>([]);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("/api/news/getList");
                setNews(response.data);
            } catch (error) {
                showSnackbar("Fehler beim Laden der News:"+ error, "error");
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-12">Game News</h1>

            <div className="flex flex-col gap-8 items-center">
                {news.map((article) => (
                    <div key={article.id}
                        className="relative w-full max-w-4xl h-64 rounded-2xl shadow-lg overflow-hidden"
                        style={{backgroundImage: `url(${article.image.original})`, backgroundSize: "cover", backgroundPosition: "center",}}>

                        <div className="absolute inset-0  flex flex-col justify-center items-center text-center p-6">
                            <h2 className="text-white bg-gray-400 p-2 rounded-full opacity-90 text-2xl font-bold mb-2">{article.title}</h2>
                            <p className="text-white bg-gray-400 p-2 rounded-full opacity-90 mb-2">{article.deck}</p>
                            <p className="text-white bg-gray-400 p-2 rounded-full opacity-90 mb-2">
                                {article.authors} - {new Date(article.publishDate).toLocaleDateString()}
                            </p>
                        </div>

                        <a href={article.siteDetailUrl} target="_blank"
                            className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                            Zur GameSpot-Seite
                        </a>
                    </div>

                ))}
            </div>
        </div>
    );
}
