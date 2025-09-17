import {type User} from "../../Model/User.tsx";



import {AccountLinks} from "./Pages/AccountLinks.tsx";
import {AccountSettings} from "./Pages/AccountSettings.tsx";
import {MiniProfile} from "./Pages/MiniProfile.tsx";
import {Gerneral} from "./Pages/General.tsx";
import {Avatar} from "./Pages/Avatar.tsx";
import {ProfileBackground} from "./Pages/ProfieBackground.tsx";
import {PageConfig} from "./Pages/PageConfig.tsx";


type pageProps = {
    User : User
    onUpdate: () => void;
}






export function GerneralPage({User, onUpdate} : pageProps) {
    return(
        <Gerneral User={User} onUpdate={onUpdate}></Gerneral>
    )
}


export function AvatarPage({ User, onUpdate }: pageProps) {

    return(
        <Avatar User={User} onUpdate={onUpdate}></Avatar>
    )

}

export function ProfileBackgroundPage({User , onUpdate} : pageProps) {

    return(
        <ProfileBackground User={User} onUpdate={onUpdate}></ProfileBackground>
    )



}

export function MiniProfilePage({User, onUpdate} : pageProps) {

    return(
        <MiniProfile User={User} onUpdate={onUpdate}></MiniProfile>
    )
}

export function AccountLinksPage({User, onUpdate} : pageProps){

    return(
        <AccountLinks User={User} onUpdate={onUpdate}></AccountLinks>
    )

}


export function PageConfigPage({User, onUpdate} : pageProps){

    return(
        <PageConfig User={User} onUpdate={onUpdate}></PageConfig>
    )

}

export function AccountSettingsPage({User, onUpdate} : pageProps) {

    return(
        <AccountSettings User={User} onUpdate={onUpdate}></AccountSettings>
    )
}


