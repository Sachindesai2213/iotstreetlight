import Button from "../button";
import { user } from "@src/api";

export default function DeviceGridButton(cellData) {
    const pushData = (data) => {
        const response = user.devices.configurations.push(cellData.data)
    };

    return <button onClick={() => pushData(cellData)}>Push data</button>;
}
