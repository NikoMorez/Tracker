import type {User} from "../Model/User.tsx";
import DrawerComponent from "../Components/DrawerComponent/DrawerComponent.tsx";

type UserProp = {
    User : User
    onUpdate : () => void
}

export default function ProfileSettings({User , onUpdate} : Readonly<UserProp>) {


    return (
        <div className="flex flex-col p-6">
            <div className="w-full max-w-3xl  mx-auto h-full">
                <DrawerComponent User={User} onUpdate={onUpdate}/>
            </div>
        </div>
    );
}