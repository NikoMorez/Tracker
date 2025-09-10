import {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {sxStyles} from "../../../assets/styles/mui/muiStyles.ts";
import type {User} from "../../../Model/User.tsx";
import axios from "axios";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";

interface ProfilePageProps {
    User: User;
    onUpdate: () => void;
}

export function Avatar({ User,onUpdate }: ProfilePageProps) {

    const [avatar, setAvatar] = useState(User.userProfile.avatar);
    const {showSnackbar} = useSnackbar();



    const handleSave = async () => {
        const updatedUser = {
            ...User,
            userProfile: {
                ...User.userProfile,
                avatar: avatar
            }
        };

        try {
            await axios.put(`/api/users/${User.id}`, updatedUser, {
            });
            onUpdate()
            showSnackbar("Avatar erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 500 }}>
            <Typography variant="h4">Profilbilder</Typography>

            <Box>
                <Typography>Avatar URL</Typography>
                <TextField
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    fullWidth
                    sx={sxStyles.textField}
                />
                {avatar && (
                    <img
                        src={avatar}
                        alt="Avatar Preview"
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }}
                    />
                )}
            </Box>


            <Button variant="contained" onClick={handleSave}>
                Speichern
            </Button>
        </Box>
    );
}