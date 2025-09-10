import AddIcon from '@mui/icons-material/Add';
import type {User} from "../Model/User.tsx";
import {Avatar} from "@mui/material";
import Linkbar from "./UserComponents/Linkbar.tsx";




type UserPropTiny = {
    User : User
}


export default function UserComponent({User} : Readonly<UserPropTiny>) {




    return(
        <>
            <div className={"mx-175 -my-5 p-1 cursor-pointer"}>
                <AddIcon></AddIcon>
            </div>
            <div className="flex flex-col md:flex-row gap-6 ">
                <Avatar
                    alt="Profilbild"
                    src={User.userProfile?.avatar || undefined}
                    sx={{
                        width: 160,
                        height: 160,
                    }}
                />

                <div className={"w-500"}>
                    <h2 className="cardsTextColor text-2xl font-bold text-start">
                        {User.userProfile.shownUsername != null ? User.userProfile.shownUsername : User.identity.username}
                    </h2>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">Bio:</span></p>
                    <p className="cardsTextColor text-left">{User.userProfile.bio}</p>
                </div>
                <div className={"w-250"}>
                    <div >
                        <p className="cardsTextColor text-left mx-auto my-auto "><span className="font-bold"></span> Gamename</p>
                        <p className="cardsTextColor text-left mx-auto my-auto "><span className="font-bold"></span> rang oder achievement</p>
                    </div>
                    <img
                        src={""}
                        alt={"Ranked"}
                        className="w-[150px] h-[150px] object-contain rounded-full"
                    />
                </div>


            </div>
            <Linkbar User={User} backGround={""}></Linkbar>
        </>
    )


}