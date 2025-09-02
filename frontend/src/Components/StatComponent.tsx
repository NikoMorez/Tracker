export default function StatComponent() {


    return(
        <>
            <div className="flex flex-col md:flex-row gap-6 ">
                <img
                    src={"https://picsum.photos/seed/picsum/200/300"}
                    alt={"Userpicture"}
                    className="mx-auto my-auto w-[50px] h-[100px] object-contain rounded-full"
                />

                <div className={"w-500"}>
                    <h5 className="cardsTextColor text-2xl font-bold text-start">
                        Gamename
                    </h5>
                    <p className="cardsTextColor text-left mb-1 mt-2"><span className="font-bold">Stats</span></p>
                    <p className="cardsTextColor text-left">Gamestats</p>
                </div>
            </div>

        </>
    )


}