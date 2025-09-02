import React, { useState } from "react";
import { Box, Stack, TextField, Modal, Button } from "@mui/material";
import { login, register } from "../api/auth";

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
    borderRadius: 8
};

const LoginModal: React.FC<LoginModalProps> = ({ openModal, handleCloseModal, onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        if (isRegister) {
            const success = await register(username, password, email);
            if (success) {
                alert("Registrierung erfolgreich, bitte einloggen");
                setIsRegister(false);
            } else {
                alert("Registrierung fehlgeschlagen");
            }
        } else {
            const success = await login(username, password);
            if (success) {
                onLoginSuccess(); // User-State in App setzen
                handleCloseModal();
            } else {
                alert("Login fehlgeschlagen");
            }
        }
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
                <Stack spacing={2}>
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
                </Stack>
            </Box>
        </Modal>
    );
};

export default LoginModal;
