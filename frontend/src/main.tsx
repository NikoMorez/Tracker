import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/css/index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import { SnackbarProvider } from "./Components/snackBar/SnackbarProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
      </BrowserRouter>
  </StrictMode>,
)
