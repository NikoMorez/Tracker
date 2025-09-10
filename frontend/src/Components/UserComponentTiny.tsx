import { Link } from "react-router-dom";
import type {User} from "../Model/User.tsx";
import {Avatar} from "@mui/material";


import Linkbar from "./UserComponents/Linkbar.tsx";

type UserPropTiny = {
    User : User
}

function isUrl(value: string | undefined) {
    try {
        if(value === undefined){
            value = ""
        }
        new URL(value);
        return true;
    } catch {
        return false;
    }
}


export default function UserComponentTiny({User} : Readonly<UserPropTiny>) {


    const backgroundStyle = isUrl(User.userProfile.backgroundImageSmall)
        ? `url(${User.userProfile.backgroundImageSmall}) center/cover no-repeat`
        : User.userProfile.backgroundImageSmall;

    const colorUserName = User.userProfile.textColorSmall != ""
        ? `${User.userProfile.textColorSmall}`
        : "white";



    return(
        <div className="w-3/4 mx-auto my-4">

            <div
                className="bg-gray-400 cardsShadowBorder cardsHover p-6 transform transition"
                style={{ background: backgroundStyle }}
            >
                <Link to={`/users/${User.id}`} className="cursor-pointer">
                    <div className="flex items-center mb-4">
                        <Avatar
                            alt="Profilbild"
                            src={User.userProfile?.avatar || undefined}
                            sx={{
                                width: 96,
                                height: 96,
                                marginRight: 1,
                                bgcolor: "gray",
                            }}
                        >

                            {User.userProfile?.shownUsername?.[0] != "" ? User.userProfile?.shownUsername?.[0] : User.identity?.username?.[0]}
                        </Avatar>


                        <div >

                                <h2 className="text-xl font-bold drop-shadow-lg  rounded-full p-2 text-shadow-2xs text-shadow-black"
                                style={{color : colorUserName, letterSpacing: "0.09em", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "0.375rem"}}
                                >
                                    {User.userProfile.shownUsername !== ""
                                        ? User.userProfile.shownUsername
                                        : User.identity.username}
                                </h2>

                        </div>

                    </div>
                </Link>

                <Linkbar User={User} backGround={"bg-white"}></Linkbar>


            </div>
        </div>


    )


}