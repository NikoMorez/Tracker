import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginModal from "./LoginModal";
import {getMe, logout} from "../api/auth.tsx";
import UserMenu from "./UserMenu";
import type {User} from "../Model/User.tsx";

import PersonIcon from '@mui/icons-material/Person';
import {useSnackbar} from "./snackBar/useSnackbar.ts";

interface HeaderProps {
    user: User | null;
    setUser: (UserProp: User | null) => void;
}

export default function Header({ user, setUser }: HeaderProps) {
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {showSnackbar}  = useSnackbar();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleLogout = () => {
        logout();
        showSnackbar("Erfolgreich Ausgeloggt", "success")
        setUser(null);
    };

    const handleLoginSuccess = async () => {
        const UserProp = await getMe();
        setUser(UserProp);
        showSnackbar("Erfolgreich Eingeloggt", "success")
        handleCloseModal();
    };


    return (
        <div className="bg-gray-800 shadow-md">
            <div className="flex h-20 justify-between items-center p-4 backGroundHeader">
                <div className="text-2xl font-bold text-gray-200 tracking-wide">Tracker </div>
            </div>

            <nav className="bg-indigo-950 border-t border-indigo-950 shadow-lg mb-8">
                <div className="mx-10 flex space-x-8 px-6 items-center">
                    <Link
                        to="/"
                        className="py-3 text-blue-300 font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white transition"
                    >
                        <HomeIcon className="-mt-1 mr-1" />Home
                    </Link>
                    <Link
                        to="/users"
                        className="py-3 text-blue-300 font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white transition"
                    >
                        <PersonIcon className="-mt-1 mr-1" />Users
                    </Link>

                    <div className="ml-auto inline-flex items-center justify-center">
                        {user ? (
                            <UserMenu
                                username={user.identity.username}
                                avatar={user.userProfile.avatar}
                                anchorEl={anchorEl}
                                open={open}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                handleLogout={handleLogout}
                            />
                        ) : (
                            <button onClick={handleOpenModal}>Login</button>
                        )}
                    </div>
                </div>
            </nav>

            <LoginModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
