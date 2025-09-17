import UserComponent from "../Components/UserComponent.tsx";
import StatComponent from "../Components/StatComponent.tsx";
import type {User} from "../Model/User.tsx";

type userPageProp = {
    User: User
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



export default function UserPage({User} : userPageProp) {

    let backgroundStyle


    if(User != null){

       backgroundStyle = isUrl(User.userProfile.backgroundImage)
            ? `url(${User.userProfile.backgroundImage}) center/cover no-repeat`
            : User.userProfile.backgroundImage;
    }else {
        backgroundStyle = "#00000"
    }



    return (
        <>
            <div className={"-mt-7 h-screen"}
                 style={{ background: backgroundStyle }}
                         >
                <div className="bg-stone-800 text-gray-200 rounded-2xl max-w-3xl mx-auto p-6 flex flex-col gap-6 opacity-95">
                   <UserComponent User={User}/>
                </div>

                <div className="bg-stone-800 text-gray-200 opacity-95 rounded-2xl mt-2 max-w-3xl mx-auto p-6 flex flex-col gap-6">
                    <StatComponent user={User}/>
                </div>
            </div>
        </>
    );
}