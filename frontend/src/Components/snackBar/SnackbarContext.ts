import { createContext } from "react";
import type {SnackbarType} from "./SnackBarTypes.tsx";


export type SnackbarContextType = {
    showSnackbar: (message: string, type?: SnackbarType) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);