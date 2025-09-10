import React, { useState } from "react";
import { Box, Stack, TextField, Modal, Button, Typography } from "@mui/material";
import { login, register } from "../api/auth";
import {useSnackbar} from "./snackBar/useSnackbar.ts";

interface LoginModalProps {
    openModal: boolean;
    handleCloseModal: () => void;
    onLoginSuccess: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 3,
    boxShadow: 24,
};

const oauthServices = [
    { name: "Steam", color: "#2A475E" },
    { name: "Discord", color: "#5865F2" },
    { name: "Twitch", color: "#9146FF" }
];

const LoginModal: React.FC<LoginModalProps> = ({ openModal, handleCloseModal, onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const {showSnackbar} = useSnackbar();

    const handleSubmit = async () => {
        if (isRegister) {
            const success = await register(username, password, email);
            if (success) {
                showSnackbar("Registrierung erfolgreich, bitte einloggen","success");
                setIsRegister(false);
            } else {
                showSnackbar("Registrierung fehlgeschlagen","error");
            }
        } else {
            const success = await login(username, password);
            if (success) {
                onLoginSuccess();
                handleCloseModal();
            } else {
                showSnackbar("Login fehlgeschlagen","error");
            }
        }
    };

    const handleConnect = (service: string) => {
        showSnackbar(`Connect with ${service} clicked`);
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
                <Stack spacing={2}>
                    <Typography variant="h5" align="center" fontWeight="bold" className={"text-blue-500"}>
                        {isRegister ? "Registrieren" : "Login"}
                    </Typography>

                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    {isRegister && (
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                    )}

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleCloseModal}>Abbrechen</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {isRegister ? "Registrieren" : "Login"}
                        </Button>
                    </Stack>

                    <Button
                        onClick={() => setIsRegister(!isRegister)}
                        color="secondary"
                        size="small"
                    >
                        {isRegister ? "Bereits registriert? Login" : "Noch keinen Account? Registrieren"}
                    </Button>

                    <Box mt={2}>
                        <Typography variant="subtitle2" mb={1}>
                            Oder verbinde dich mit:
                        </Typography>
                        <Stack spacing={1}>
                            {oauthServices.map(service => (
                                <Button
                                    key={service.name}
                                    onClick={() => handleConnect(service.name)}
                                    sx={{
                                        backgroundColor: service.color,
                                        color: "white",
                                        textTransform: "none",
                                        borderRadius: 20,
                                        px: 2,
                                        py: 1,
                                        "&:hover": {
                                            backgroundColor: service.color,
                                            opacity: 0.8
                                        }
                                    }}
                                    fullWidth
                                >
                                    Connect with {service.name}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
};

export default LoginModal;
