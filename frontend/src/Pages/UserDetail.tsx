import UserComponent from "../Components/UserComponent.tsx";
import StatComponent from "../Components/StatComponent.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {User} from "../Model/User.tsx";
import axios from "axios";
import {isUrl} from "../assets/ts/functions.ts";




export default function UserDetail() {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/users/${id}`)
                .then((response) => {
                    setUser(response.data);

                })
        }else{
            console.log(id)
        }
    }, [id]);

    if (!user) {
        return (
            <div className="">

            </div>
        );
    }


    let backgroundStyle


    if(user.userProfile.backgroundImage != undefined){

        backgroundStyle = isUrl(user.userProfile.backgroundImage)
            ? `url(${user.userProfile.backgroundImage}) center/cover no-repeat`
            : user.userProfile.backgroundImage;

    }else {
        backgroundStyle = "#00000"
    }



    return (
        <>
            <div className={"-mt-7 h-screen"}
                 style={{ background: backgroundStyle }}
            >
                <div className="bg-stone-800 text-gray-200 rounded-2xl max-w-3xl mx-auto p-6 flex flex-col gap-6 opacity-95">
                    <UserComponent User={user}/>
                </div>

                <div className="bg-stone-800 text-gray-200 opacity-95 rounded-2xl mt-2 max-w-3xl mx-auto p-6 flex flex-col gap-6">
                    <StatComponent/>
                </div>
            </div>
        </>
    );
}