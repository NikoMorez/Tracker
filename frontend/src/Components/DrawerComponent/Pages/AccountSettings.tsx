import {useState} from "react";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";
import {Box, Button, TextField, Typography} from "@mui/material";
import type {User} from "../../../Model/User.tsx";


type pageProps = {
    User : User
    onUpdate : () => void
}

export function AccountSettings({User, onUpdate} : pageProps) {
    const [formData, setFormData] = useState<User>(User);
    const { showSnackbar } = useSnackbar();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleChange = (field: keyof User, value: string) => {
        setFormData({ ...formData, [field]: value });
    };


    const handleSave = () => {
        if (newPassword || repeatPassword) {
            if (newPassword !== repeatPassword) {
                showSnackbar("Die neuen Passwörter stimmen nicht überein!","error")
                return;
            }

            if (oldPassword !== User.identity.password) {
                showSnackbar("Das alte Passwort ist falsch!","error");
                return;
            }

            formData.identity.password = newPassword;
        }

        onUpdate();
        showSnackbar("Änderungen gespeichert!","success");
    };


    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Accounteinstellungen
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Email"
                    type="email"
                    value={formData.identity.email}
                    onChange={(e) => handleChange("identity", e.target.value)}
                />

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Passwort ändern
                </Typography>
                <TextField
                    label="Altes Passwort"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                    label="Neues Passwort"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Neues Passwort wiederholen"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <Button variant="contained" color="primary" onClick={handleSave}>
                    Speichern
                </Button>
            </Box>
        </Box>
    );
}