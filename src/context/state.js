import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { setCookie } from "../utils/cookies"
import { user } from "@src/api"


const AppContext = createContext();

export function AppWrapper({ children }) {
    // const [devices, setDevices] = useState([]);
    let [token, setToken] = useState(()=> typeof window !== "undefined" ? window?.localStorage?.getItem("token") : null)
    let [loggedInUser, setLoggedInUser] = useState({})
    
    useEffect(()=> {

        if(token){
            setLoggedInUser(jwt_decode(token))
            setCookie("user_id", jwt_decode(token).user_id)
        }

    }, [token])

    const response = user.devices.all()

    let devices = []

    if (response?.status == 200) {
        response.data.map(({id, name, device_parameters}) => {
            devices.push({id, name, device_parameters})
        })
        setCookie("devices", JSON.stringify(devices))
    }

    return (
        <AppContext.Provider value={{devices, setToken, token}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
