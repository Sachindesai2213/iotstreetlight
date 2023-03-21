import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [devices, setDevices] = useState([]);

    return (
        <AppContext.Provider value={{devices, setDevices}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
