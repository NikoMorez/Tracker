import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

import PersonIcon from '@mui/icons-material/Person';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Modal, Stack, TextField} from "@mui/material";
import {useState} from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Header() {

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);



    const login:boolean = false;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="bg-gray-800 shadow-md ">

                <div className="flex h-20 justify-between items-center p-4 backGroundHeader">
                    <div className="text-2xl font-bold text-gray-200 tracking-wide ">
                        Tracker
                    </div>
                </div>

                <nav className="bg-indigo-950 border-t border-indigo-950 shadow-lg shadow-gray-800 dark:shadow-gray-900 mb-8">
                    <div className="mx-10 flex space-x-8 px-6 items-center">
                        <Link to={"/"}
                              className="py-3 text-blue-300 font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white transition">
                            <HomeIcon className={"-mt-1 mr-1"}/>Home
                        </Link>
                        <div className={"ml-auto inline-flex items-center justify-center"}>
                            {login ?(
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }} src={"https://picsum.photos/seed/moi/150/200"}></Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My page
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                            ) :
                                <>
                                    <div className={""}>
                                        <button className={"cursor-pointer"} onClick={handleOpenModal}>
                                            <PersonIcon/>
                                        </button>
                                    </div>
                                    <Modal className={"!rounded-2xl"}
                                            open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description">
                                        <Box sx={style} className={"!bg-stone-800"}>
                                            <Stack spacing={2}>
                                                <TextField
                                                    label="Username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                    fullWidth
                                                    sx={{
                                                        input: { color: "white" },
                                                        label: { color: "white" },
                                                        transition: "color 120ms ease, transform 120ms ease",
                                                    }}
                                                    className={"!border-2 !text-white"}
                                                />
                                                <TextField
                                                    label="Password"
                                                    value={password}
                                                    required
                                                    fullWidth
                                                    sx={{
                                                        input: { color: "white" }, // text color
                                                        label: { color: "white" }, // label color
                                                    }}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={"!border-2"}
                                                />
                                                <div>
                                                    <button className={"stdButton stdColor"} onClick={handleCloseModal}>Abbrechen</button>
                                                    <button className={"stdButton stdColor mx-18"}>Login</button>
                                                </div>
                                            </Stack>
                                        </Box>
                                    </Modal>
                                </>
                            }
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}