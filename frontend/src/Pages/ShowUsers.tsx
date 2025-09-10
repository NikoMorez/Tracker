import type {User} from "../Model/User.tsx";
import UserComponentTiny from "../Components/UserComponentTiny.tsx";


type ShownUserProp = {
    Users : User[]
}


export default function ShowUsers({Users} : Readonly<ShownUserProp>) {


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            {Users.map((user) =>(
                <UserComponentTiny User={user}/>
            ))}
        </div>
    );
}