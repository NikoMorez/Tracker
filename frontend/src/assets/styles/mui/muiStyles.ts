import type { SxProps, Theme } from "@mui/material";

export const sxStyles: { [key: string]: SxProps<Theme> } = {
    formControl: {
        mb: 2,
        "& .MuiInputLabel-root": {
            color: "#E0F2F1",
            backgroundColor: "#121212",
            px: 0.5,
            borderRadius: 1,
        },
        "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
            backgroundColor: "#121212",
            color: "white",
            borderColor: "#1E3A2F",
            borderRadius: 2,
            "&:hover fieldset": {
                borderColor: "#1E3A2F",
            },
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "#1E3A2F",
        },
    },
    textArea: {
        width: "100%",
        padding: 8,
        fontSize: 16,
        borderRadius: 4,
        borderColor: "#1E3A2F",
        backgroundColor: "#121212",
        color: "white",
        "&:focus": {
            outline: "none",
            borderColor: "#1E3A2F",
        },
    },
    textField: {
        backgroundColor: "#121212",
        color: "white",
        "& .MuiInputLabel-root": {
            color: "#E0F2F1",
            backgroundColor: "#121212",
            px: 0.5,
            borderRadius: 1,
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "#1E3A2F",
        },
        "& input": {
            color: "white",
        },
    },
    select: {
        mb: 1,
        backgroundColor: "#121212",
        color: "white",
        borderRadius: 1,
        "& .MuiSelect-select": { color: "white" },
        "& .MuiSelect-icon": { color: "#E0F2F1" },
        "&:focus": { borderColor: "#1E3A2F" },
    },
    selectLabel: {
        color: "#E0F2F1",
        backgroundColor: "#121212",
        px: 0.5,
        borderRadius: 1,
    },
    selectMenu: {
        backgroundColor: "#121212",
        color: "white",
    },
};