import UserComponent from "../Components/UserComponent.tsx";
import StatComponent from "../Components/StatComponent.tsx";


export default function UserPage() {

    return (
        <>
            <div className={"backGroundHeader -mt-7 h-full"}>
                <div className="bg-stone-800 text-gray-200 rounded-2xl max-w-3xl mx-auto p-6 flex flex-col gap-6 opacity-95">
                   <UserComponent/>
                </div>

                <div className="bg-stone-800 text-gray-200 opacity-95 rounded-2xl mt-2 max-w-3xl mx-auto p-6 flex flex-col gap-6">
                    <StatComponent/>
                </div>
            </div>
        </>
    );
}