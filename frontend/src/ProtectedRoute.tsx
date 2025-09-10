import {Navigate, Outlet} from "react-router-dom"
import type {User} from "./Model/User.tsx";

type ProtectedRouteProps = {
    user:User|undefined|null
}

export default function ProtectedRoute(props:Readonly<ProtectedRouteProps>) {


    if (props.user?.identity.username === undefined) {
        return <h3>loading</h3>;
    }

    return(
        props.user?.identity.username ? <Outlet/> : <Navigate to={"/"}/>
    )
}