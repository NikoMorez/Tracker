import {useState} from "react";
import axios from "axios";
import {Box, Button, IconButton, Switch, Typography} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import type {User} from "../../../Model/User.tsx";
import {allowedServices, serviceColors} from "../../../assets/ts/utils.ts";
import {useSnackbar} from "../../snackBar/useSnackbar.ts";


type pageProps = {
    User : User
    onUpdate : () => void
}





type Service = {
    name: string;
    url : string;
    visible: boolean;
    order: number;
    authenticated?: boolean;
};


export function AccountLinks({ User, onUpdate }: pageProps) {
   const {showSnackbar} = useSnackbar()

    const [services, setServices] = useState<Service[]>(
        Object.entries(User.userProfile.serviceNames || {}).map(([name, data]: any, i) => ({
            name,
            url : data.url,
            visible: data.visible,
            order: data.order ?? i,
            authenticated: true
        }))
    );

    const [isDirty, setIsDirty] = useState(false);


    const connectWithService = async (serviceName: string) => {
        const newService: Service = {
            name: serviceName,
            url : "https://"+serviceName+".com",
            visible: true,
            order: services.length,
            authenticated: true
        };
        setServices(prev => [...prev, newService]);
        setIsDirty(true);
    };


    const moveService = (index: number, direction: "up" | "down") => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= services.length) return;
        const reordered = [...services];
        const [moved] = reordered.splice(index, 1);
        reordered.splice(newIndex, 0, moved);
        setServices(reordered.map((s, i) => ({ ...s, order: i })));
        setIsDirty(true);
    };


    const removeService = (name: string) => {
        setServices(prev => prev.filter(s => s.name !== name));
        setIsDirty(true);
    };


    const saveConfiguration = async () => {
        const updatedUser = {
            ...User,
            userProfile: {
                ...User.userProfile,
                serviceNames: services.reduce(
                    (acc, s) => ({ ...acc, [s.name]: {url : s.url, visible: s.visible, order: s.order } }),
                    {}
                )
            }
        };

        try {
            await axios.put(`/api/users/${User.id}`, updatedUser, {

            });
            onUpdate()
            setIsDirty(false);
            showSnackbar("Einstellungen erfolgreich gespeichert!", "success");
        } catch (err: any) {
            showSnackbar("Fehler beim Speichern: " + (err.response?.data?.message || err.message), "error");
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Account Links konfigurieren
            </Typography>


            <Box display="flex" flexDirection="column" gap={1} mb={2}>
                {allowedServices.map(service => {
                    const connected = services.find(s => s.name === service && s.authenticated);
                    if (connected) return null;
                    return (
                        <Button
                            key={service}
                            variant="outlined"
                            onClick={() => connectWithService(service)}
                            sx={{
                                borderRadius: "20px",
                                minWidth: 200,
                                height: 40,
                                textTransform: "none",
                                backgroundColor: serviceColors[service]?.active,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: serviceColors[service]?.inactive
                                }
                            }}
                        >
                            Connect With {service}
                        </Button>
                    );
                })}
            </Box>


            <Box display="flex" flexDirection="column" gap={1}>
                {services.map((s, index) => (
                    <Box
                        key={s.name}
                        display="flex"
                        alignItems="center"
                        sx={{
                            borderRadius: "16px",
                            padding: "4px 8px",
                            gap: 1,
                            backgroundColor: s.visible
                                ? serviceColors[s.name].active
                                : serviceColors[s.name].inactive,
                            color: "white"
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 70 }}>
                            {s.name}
                        </Typography>


                        <Switch
                            checked={s.visible}
                            onChange={() => {
                                const updated = [...services];
                                updated[index].visible = !updated[index].visible;
                                setServices(updated);
                                setIsDirty(true);
                            }}
                            size="small"
                        />
                        <div className={"flex justify-end gap-1 flex-grow"}>
                            <IconButton size="small" sx={{ color: "white" }} onClick={() => moveService(index, "up")}>
                                <ArrowUpward fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: "white" }} onClick={() => moveService(index, "down")}>
                                <ArrowDownward fontSize="inherit" />
                            </IconButton>

                            <Button size="small" sx={{ color: "white", minWidth: 20 }} onClick={() => removeService(s.name)}>
                                ✕
                            </Button>
                        </div>
                    </Box>
                ))}
            </Box>


            <Box mt={3}>
                <Button variant="contained" color="primary" onClick={saveConfiguration} disabled={!isDirty}>
                    Speichern
                </Button>
            </Box>
        </Box>
    );
}