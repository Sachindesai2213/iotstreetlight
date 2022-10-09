import Button from "@src/components/button";
import { useState } from "react";
import AddMeter from "./add-meter";

export default function Meters(){

    const [showAddMeter, setShowAddMeter] = useState(false)
    return (
        <>
            <div>Meters</div>
            <Button text="Add meter" attrs={{onClick: () => setShowAddMeter(true)}}/>

            {showAddMeter && <AddMeter/>}
        </>
    )
}