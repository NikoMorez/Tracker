import {isValidServiceUrl} from "../../assets/ts/functions.ts";
import {serviceColors} from "../../assets/ts/utils.ts";
import type {User} from "../../Model/User.tsx";


type linkProps = {
    User: User
    backGround : string
}




export default function Linkbar( {User , backGround} : linkProps){
    const services = Object.entries(User.userProfile.serviceNames || {})
        .map(([name, data]: [string, any]) => ({
            name,
            url: data.url,
            visible: data.visible,
            order: data.order
        }))
        .filter(s => s.visible && s.url && isValidServiceUrl(s.name, s.url))
        .sort((a, b) => a.order - b.order);


    return(

        <div className={` ${backGround} opacity-80 rounded-lg p-2 flex items-center space-x-3 min-h-[56px]`}>
            {services.length > 0 ? (
                services.map(s => {
                    const colors = serviceColors[s.name] || { active: "#666" };

                    return (
                        <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center transition text-white"
                            style={{ backgroundColor: colors.active }}
                        >
                            {s.name.charAt(0)}
                        </a>
                    );
                })
            ) : (
                <span className="text-gray-500 text-sm"></span>
            )}
        </div>

    )


}