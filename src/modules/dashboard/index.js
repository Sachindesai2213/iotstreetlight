import { user } from "@src/api";
import Loader from "@src/components/loader";
import DashboardTopCard from "@src/components/dashboard-top-card";
import Header from "@src/components/header";
import { isUserLoggedIn } from "@src/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

export default function Dashboard() {
    const router = useRouter();

    const center = {
        lat: 19.07609,
        lng: 72.877426,
    };

    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push(`/login?target=${router.asPath}`);
        }
    }, []);

    const cards = user.dashboardData.get();

    return (
        <>
            <Header activeNavItem="dashboard" />
            <div className="p-8 bg-lightprimary">
                <div className="grid grid-cols-4 gap-8">
                    {!!cards ? (
                        cards?.data?.dashboard_data?.map((item, key) => (
                            <DashboardTopCard {...item} key={key} />
                        ))
                    ) : (
                        <div className="col-span-4">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="p-4">
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_KEY}>
                    <GoogleMap
                        zoom={11}
                        center={center}
                        mapContainerStyle={{ height: "500px" }}
                        onLoad={(map) => {
                            console.log("Map is ready");
                        }}
                    >
                        {!!cards ? (
                            cards?.data?.devices?.map(({latitude, longitude}, key) => (
                                <MarkerF position={{lat: parseFloat(latitude), lng: parseFloat(longitude)}} key={key}/>
                            ))
                        ) : (
                            <></>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div> */}
        </>
    );
}
