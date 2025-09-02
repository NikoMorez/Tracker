import AddIcon from '@mui/icons-material/Add';

export default function UserComponent() {


    return(
        <>
            <div className={"mx-175 -my-5 p-1 cursor-pointer"}>
                <AddIcon></AddIcon>
            </div>

            <div className="flex flex-col md:flex-row gap-6 ">
                <img
                    src={"https://picsum.photos/seed/picsum/200/300"}
                    alt={"Userpicture"}
                    className="mx-auto my-auto w-[200px] h-[200px] object-contain rounded-full"
                />

                <div className={"w-500"}>
                    <h2 className="cardsTextColor text-2xl font-bold text-start">
                        UserName
                    </h2>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">Bio:</span> UserBio</p>
                    <p className="cardsTextColor text-left">testtext</p>
                </div>
                <div className={"w-250"}>
                    <div >
                        <p className="cardsTextColor text-left mx-auto my-auto "><span className="font-bold"></span> Gamename</p>
                        <p className="cardsTextColor text-left mx-auto my-auto "><span className="font-bold"></span> Radient</p>
                    </div>
                    <img
                        src={"https://www.dexerto.com/cdn-image/wp-content/uploads/2021/01/valorant-act-rank.jpeg?width=1200&quality=100&format=auto"}
                        alt={"Ranked"}
                        className="w-[150px] h-[150px] object-contain rounded-full"
                    />
                </div>






            </div>
            <div>
                <div className={"w-full"}>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">Links</span> </p>
                </div>
            </div>
        </>
    )


}