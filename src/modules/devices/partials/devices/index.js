import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, Editing, FilterRow, HeaderFilter, Lookup, MasterDetail, PatternRule } from "devextreme-react/data-grid"
import Parameters from "./parameters"
import DeviceGridButton from "@src/components/device-grid-button"

const PERIOD_TYPES = [
    { type: "Fixed" },
    { type: "Automatic" }
]

export default function DevicesTable(props){
    const {devices} = props
    const user_id = getCookie("user_id")
    return (
        <div className="p-5">
            <DataGrid
                dataSource={devices || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
                onSaved={async (e) => {
                    e.changes[0].data.user_id = user_id
                    const response = await user.devices.create(e.changes[0].data)
                }}
            >
                <Editing
                    mode="row"
                    // allowUpdating={true}
                    // allowDeleting={true}
                    allowAdding={true} />
                <FilterRow visible />
                <HeaderFilter visible />
                <Column dataField="name" caption="Device" alignment="center" />
                <Column dataField="group" caption="Group" alignment="center" />
                <Column caption="Push data" alignment="center" cellRender={DeviceGridButton} />
                <MasterDetail
                    enabled={true}
                    component={Parameters}
                />
                {/* <Column dataField="off_time" caption="Off Time" alignment="center" dataType="datetime" format="HH:mm" /> */}
            </DataGrid>
        </div>
    )
}