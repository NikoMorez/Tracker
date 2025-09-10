import {useState} from "react";
import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {sxStyles} from "../../../assets/styles/mui/muiStyles.ts";
import {BackgroundColor, BackgroundColorLabels, TextColor, TextColorLabels} from "../../../Model/ColorEnums.tsx";
import UserComponentTiny from "../../UserComponentTiny.tsx";
import type {User} from "../../../Model/User.tsx";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";
import axios from "axios";



type pageProps = {
    User : User
    onUpdate: () => void;
}

export function MiniProfile({User, onUpdate} : pageProps) {

    const [bgSmallType, setBgSmallType] = useState<"image" | "color">("image");

    const [editableUser, setEditableUser] = useState({ ...User });


    const {showSnackbar} = useSnackbar();

    const handleSave = async () => {
        try {
            await axios.put(`/api/users/${User.id}`, editableUser, {
            });
            onUpdate()
            showSnackbar("Änderungen erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };



    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Mini Profile
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography>Hintergrund</Typography>
                <Select
                    value={bgSmallType}
                    onChange={(e) =>
                        setBgSmallType(e.target.value as "image" | "color")
                    }
                    sx={sxStyles.select}
                >
                    <MenuItem value="image">Bild</MenuItem>
                    <MenuItem value="color">Farbe</MenuItem>
                </Select>

                {bgSmallType === "image" ? (
                    <TextField
                        value={editableUser.userProfile.backgroundImageSmall}
                        onChange={(e) =>
                            setEditableUser((prev) => ({
                                ...prev,
                                userProfile: {
                                    ...prev.userProfile,
                                    backgroundImageSmall: e.target.value,
                                },
                            }))

                        }
                        placeholder="https://example.com/background-small.jpg"
                        fullWidth
                        sx={sxStyles.textField}
                    />
                ) : (
                    <Select
                        value={editableUser.userProfile.backgroundImageSmall }
                        onChange={(e) =>
                            setEditableUser((prev) => ({
                                ...prev,
                                userProfile: {
                                    ...prev.userProfile,
                                    backgroundImageSmall: e.target.value,
                                },
                            }))

                        }
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
                <Typography className={"!mt-5"}>Textfarbe</Typography>
                <Select
                    value={editableUser.userProfile.textColorSmall}
                    onChange={(e) =>
                        setEditableUser((prev) => ({
                            ...prev,
                            userProfile: {
                                ...prev.userProfile,
                                textColorSmall: e.target.value,
                            },
                        }))

                    }
                    fullWidth
                    sx={sxStyles.select}
                >
                    {Object.values(TextColor).map((color) => (
                        <MenuItem key={color} value={color}>
                            {TextColorLabels [color as TextColor]}
                        </MenuItem>
                    ))}
                </Select>

            </Box>

            <UserComponentTiny User={editableUser} />

            <Button className={"!mt-4"} variant="contained" color="primary" onClick={handleSave}>
                Speichern
            </Button>
        </Box>
    );
}