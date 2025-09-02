import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginModal from "./LoginModal";
import { logout } from "../api/auth.tsx";
import UserMenu from "./UserMenu";

interface HeaderProps {
    user: string | null;
    setUser: (username: string | null) => void;
}

export default function Header({ user, setUser }: HeaderProps) {
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    const handleLoginSuccess = async () => {
        const username = await fetchMe();
        setUser(username);
        handleCloseModal();
    };

    const fetchMe = async () => {
        const res = await fetch("/api/auth/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) return null;
        return res.text();
    };

    return (
        <div className="bg-gray-800 shadow-md">
            <div className="flex h-20 justify-between items-center p-4 backGroundHeader">
                <div className="text-2xl font-bold text-gray-200 tracking-wide">Tracker</div>
            </div>

            <nav className="bg-indigo-950 border-t border-indigo-950 shadow-lg mb-8">
                <div className="mx-10 flex space-x-8 px-6 items-center">
                    <Link
                        to="/"
                        className="py-3 text-blue-300 font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white transition"
                    >
                        <HomeIcon className="-mt-1 mr-1" />Home
                    </Link>

                    <div className="ml-auto inline-flex items-center justify-center">
                        {user ? (
                            <UserMenu
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
