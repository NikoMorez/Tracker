import './assets/css/App.css'

import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import HomePage from "./Pages/HomePage.tsx";
import UserPage from "./Pages/UserPage.tsx";
import {useEffect, useState} from "react";
import {getMe} from "./api/auth.tsx";

function App() {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const username = await getMe();
            setUser(username);
        };
        checkUser();
    }, []);

    return (
        <>
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path={""} element={<HomePage />} />
                <Route path={`/userPage`} element={<UserPage />} />
            </Routes>
        </>
    );
}

export default App;