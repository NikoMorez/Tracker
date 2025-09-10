import React from "react";
import { Box, Avatar, Menu, MenuItem, IconButton, Tooltip, Divider, ListItemIcon, Link } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


interface UserMenuProps {
    anchorEl: HTMLElement | null;
    username : string
    avatar : string
    open: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({username, avatar, anchorEl, open, handleClick, handleClose, handleLogout }) => {
    return (
        <>
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
                        <div className={"text-blue-300 mr-2 font-semibold"}>{username}</div>
                        <Avatar sx={{ width: 32, height: 32 }} src={avatar} />
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
                            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
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
                    <Link href={"/userpage"}>
                    <Avatar /> Profile
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <Link href={"/user/settings"}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                    Settings
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
