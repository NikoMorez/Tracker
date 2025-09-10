import {useState} from "react";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";
import {Region, type User, type UserProfile} from "../../../Model/User.tsx";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import {sxStyles} from "../../../assets/styles/mui/muiStyles.ts";
import axios from "axios";


type pageProps = {
    User : User
    onUpdate : () => void
}

export function Gerneral({User, onUpdate} : pageProps) {
    const [formData, setFormData] = useState<User>(User);
    const { showSnackbar } = useSnackbar();

    const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleProfileChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
        setFormData((prev) => ({
            ...prev,
            userProfile: {
                ...prev.userProfile,
                [field]: value,
            },
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/users/${formData.id}`, formData, {
                headers: {
                },
            });
            onUpdate()
            showSnackbar("Änderungen erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };



    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Allgemein
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Shown Username"
                    value={formData.userProfile.shownUsername}
                    onChange={(e) => handleProfileChange("shownUsername", e.target.value)}
                    sx={sxStyles.textField}
                />
                <FormControl fullWidth  sx={sxStyles.formControl}>
                    <InputLabel>Bio</InputLabel>
                    <TextareaAutosize
                        minRows={3}
                        value={formData.userProfile.bio}
                        onChange={(e) => handleProfileChange("bio", e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth  sx={sxStyles.formControl}>
                    <InputLabel>Region</InputLabel>
                    <Select
                        value={formData.region}
                        onChange={(e) => handleChange("region", e.target.value as Region)}

                    >
                        <MenuItem value={Region.NotDefined}>
                            Keine Region Angeben
                        </MenuItem>
                        {Object.values(Region).filter((r) => r !== Region.NotDefined)
                            .map((region) => (
                                <MenuItem key={region} value={region}>
                                    {region.charAt(0).toUpperCase() + region.slice(1)}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSave}>
                    Speichern
                </Button>
            </Box>
        </Box>
    );
}