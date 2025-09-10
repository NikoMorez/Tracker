import {Navigate, Outlet} from "react-router-dom"
import type {User} from "./Model/User.tsx";

type ProtectedAdminRouteProps = {
    user:User|undefined|null
}

export default function ProtectedRouteAdmin(props:Readonly<ProtectedAdminRouteProps>) {

    if (props.user?.identity.username === undefined) {
        return <h3>loading</h3>;
    }
    if(props.user != undefined && props.user.identity.role === "ADMIN"){
        return(
            props.user.identity.username ? <Outlet/> : <Navigate to={"/"}/>
        )
    }

}