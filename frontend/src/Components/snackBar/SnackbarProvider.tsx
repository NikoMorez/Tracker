import React, {useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {SnackbarContext} from "./SnackbarContext.ts";
import type {SnackbarType} from "./SnackBarTypes.tsx";



export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<SnackbarType>("info");


    const showSnackbar = (msg: string, severity: SnackbarType = "info") => {
        setMessage(msg);
        setType(severity);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type === "default" ? "info" : type} variant="filled" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );


};
