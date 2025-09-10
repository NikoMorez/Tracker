import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
} from "@mui/material";

import { useState } from "react";
import {
    AccountLinksPage,
    AccountSettingsPage,
    AvatarPage, GerneralPage, MiniProfilePage,
    ProfileBackgroundPage,
} from "./DrawerPages.tsx";
import type {User} from "../../Model/User.tsx";

const drawerWidth = 240;


type drawerProps = {
    User : User
    onUpdate : () => void
}

export default function DrawerComponent({User, onUpdate} : drawerProps) {
    const [selectedPage, setSelectedPage] = useState("Allgemein");

    const pages: { [key: string]: React.ReactNode } = {
        "Allgemein": <GerneralPage User={User} onUpdate={onUpdate}/>,
        "Avatar": <AvatarPage User={User} onUpdate={onUpdate}/>,
        "ProfileBackground": <ProfileBackgroundPage User={User} onUpdate={onUpdate}/>,
        "MiniProfile": <MiniProfilePage User={User} onUpdate={onUpdate}/>,
        "Account Links": <AccountLinksPage User={User} onUpdate={onUpdate}/>,
        "Account Settings": <AccountSettingsPage User={User} onUpdate={onUpdate}/>,
    };

    const drawer = (
        <div>

            <Toolbar>
                <h2 className={""}>Profileinstellungen</h2>
            </Toolbar>

            <Divider />
            <List>
                {["Allgemein", "Avatar","ProfileBackground", "MiniProfile", "Account Links", "Account Settings"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => setSelectedPage(text)}
                            selected={selectedPage === text}
                        >
                            <ListItemIcon>
                                x
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "78vh",
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >

            <Drawer
                variant="permanent"
                open
                sx={{
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        height: "100%",
                        boxSizing: "border-box",
                        overflowY: "auto",
                        position: "relative",
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Box sx={{ flexGrow: 1, p: 2 , overflowY: "auto" }}>
                {pages[selectedPage]}
            </Box>
        </Box>
    );
}
