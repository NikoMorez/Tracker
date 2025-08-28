import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function Header() {

    return (
        <>
            <div className="bg-gray-800 shadow-md ">

                <div className="flex h-20 justify-between items-center p-4 backGroundHeader">
                    <div className="text-2xl font-bold text-gray-200 tracking-wide ">
                        Tracker
                    </div>
                </div>

                <nav
                    className="bg-indigo-950 border-t border-indigo-950 shadow-lg shadow-gray-800 dark:shadow-gray-900 mb-8">
                    <div className="mx-10 flex space-x-8 px-6 items-center">
                        <Link to={"/"}
                              className="py-3 text-blue-300 font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white transition">
                            <HomeIcon className={"-mt-1 mr-1"}/>Home
                        </Link>
                    </div>
                </nav>

            </div>

        </>
    )
}