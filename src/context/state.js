import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { setCookie } from "../utils/cookies"


const AppContext = createContext();

export function AppWrapper({ children }) {
    const [devices, setDevices] = useState([]);
    let [token, setToken] = useState(()=> typeof window !== "undefined" ? window?.localStorage?.getItem("token") : null)
    let [user, setUser] = useState({})
    
    useEffect(()=> {

        if(token){
            setUser(jwt_decode(token))
            setCookie("user_id", jwt_decode(token).user_id)
        }


    }, [token])

    return (
        <AppContext.Provider value={{devices, setDevices, setToken}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
