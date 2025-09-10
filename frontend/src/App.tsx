import './assets/styles/css/App.css'

import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import HomePage from "./Pages/HomePage.tsx";
import UserPage from "./Pages/UserPage.tsx";
import {useEffect, useState} from "react";
import {getMe} from "./api/auth.tsx";
import type {User} from "./Model/User.tsx";
import axios from "axios";
import ShowUsers from "./Pages/ShowUsers.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ProfileSettings from "./Pages/ProfileSettings.tsx";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin.tsx";
import UserDetail from "./Pages/UserDetail.tsx";


function App() {
    const [user, setUser] = useState<User | null>(null);

    const [allUsers,setAllUsers] = useState<User[]>([]);


    const checkUser = async () => {
        const me = await getMe();
        setUser(me);
    };

    const loadUsers = async () =>  {

        try {
            const response = await axios.get("/api/users");
            setAllUsers(response.data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        }
    }

    const loadData = async () => {
        checkUser();
        loadUsers()
    }

    useEffect(() => {
        loadUsers();
        checkUser();
    }, []);



    return (
        <>
            <Header  user={user} setUser={setUser} />
            <Routes>
                <Route path={""} element={<HomePage />} />
                <Route path={"/users"} element={<ShowUsers Users={allUsers}/>}></Route>
                <Route path={`/users/:id`} element={<UserDetail/>}></Route>

                <Route element={<ProtectedRoute user={user} />} >
                    {user != null ?
                        <>
                            <Route path="/user/settings" element={<ProfileSettings User={user} onUpdate={loadData}/>} />
                            <Route path={`/userPage/`} element={<UserPage User={user} />} />
                        </>
                        : <> </>
                    }
                </Route>
                <Route element={<ProtectedRouteAdmin user={user}/> }>

                </Route>
            </Routes>
        </>
    );
}

export default App;