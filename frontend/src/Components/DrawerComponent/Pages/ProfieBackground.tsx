import {useState} from "react";
import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {sxStyles} from "../../../assets/styles/mui/muiStyles.ts";
import {BackgroundColor, BackgroundColorLabels} from "../../../Model/ColorEnums.tsx";
import type {User} from "../../../Model/User.tsx";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";
import {isUrl} from "../../../assets/ts/functions.ts";
import axios from "axios";

type pageProps = {
    User : User
    onUpdate : () => void
}






export function ProfileBackground({User, onUpdate} : pageProps) {

    const [bgType, setBgType] = useState<"image" | "color">("image");
    const [bgValue, setBgValue] = useState(User.userProfile.backgroundImage? User.userProfile.backgroundImage : "");
    const {showSnackbar} = useSnackbar();

    const handleSave = async () => {


        const updatedUser: User = {
            ...User,
            userProfile: {
                ...User.userProfile,
                backgroundImage: bgValue
            }
        };

        try {
             await axios.put(`/api/users/${User.id}`, updatedUser, {
                headers: {

                }
            });
            onUpdate()
            showSnackbar("Profilhintergrund erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };





    return (
        <Box>
            <Typography variant="h4" gutterBottom>Profilhintergrund</Typography>
            <Box>
                <Typography>Hintergrundbild</Typography>
                <Select
                    value={bgType}
                    onChange={(e) => setBgType(e.target.value as "image" | "color")}
                    sx={sxStyles.select}
                >
                    <MenuItem value="image">Bild</MenuItem>
                    <MenuItem value="color">Farbe</MenuItem>
                </Select>

                {bgType === "image" ? (
                    <TextField
                        value={bgValue}
                        onChange={(e) => setBgValue(e.target.value)}
                        placeholder="https://example.com/background.jpg"
                        fullWidth
                        sx={sxStyles.textField}
                    />
                ) : (
                    <Select
                        value={bgValue}
                        onChange={(e) => setBgValue(e.target.value)}
                        fullWidth
                        sx={sxStyles.select}
                    >
                        {Object.values(BackgroundColor).map((color) => (
                            <MenuItem key={color} value={color}>
                                {BackgroundColorLabels [color as BackgroundColor]}
                            </MenuItem>
                        ))}
                    </Select>
                )}

                <Box
                    sx={{
                        width: "100%",
                        height: 150,
                        mt: 1,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        background: isUrl(bgValue) ? `url(${bgValue}) center/cover no-repeat` : bgValue
                    }}
                />
            </Box>
            <Button className={"!mt-4"} variant="contained" color="primary" onClick={handleSave}>
                Speichern
            </Button>
        </Box>
    );
}
