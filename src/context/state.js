import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { setCookie } from "../utils/cookies";
import axios from "axios";
import { headers } from "next.config";

const AppContext = createContext();

export function AppWrapper({ children }) {
    let [token, setToken] = useState();

    // const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // useEffect(() => {
    //     if (window?.localStorage?.getItem("token")) {
    //         setCookie("user_id", jwt_decode(token).user_id);

    //         axios({
    //             method: "GET",
    //             url: `${API_URL}/api/devices`,
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //             .then((response) => {

    //                 if (response?.status == 200) {
    //                     let temp = [];
    //                     response.data.map(({ id, name, device_parameters }) => {
    //                         temp.push({ id, name, device_parameters });
    //                     });
    //                     setCookie("devices", JSON.stringify(temp));
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [token]);

    return (
        <AppContext.Provider value={{ setToken, token }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
