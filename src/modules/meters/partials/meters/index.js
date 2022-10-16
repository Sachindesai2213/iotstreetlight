import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, Editing, FilterRow, HeaderFilter, Lookup, MasterDetail, PatternRule } from "devextreme-react/data-grid"
import Parameters from "./parameters"

const PERIOD_TYPES = [
    { type: "Fixed" },
    { type: "Automatic" }
]

export default function MetersTable(props){
    const {meters} = props
    const user_id = getCookie("user_id")
    return (
        <div className="p-5">
            <DataGrid
                dataSource={meters || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
                onSaved={async (e) => {
                    e.changes[0].data.user_id = user_id
                    const response = await user.meters.create(e.changes[0].data)
                }}
            >
                <Editing
                    mode="row"
                    // allowUpdating={true}
                    // allowDeleting={true}
                    allowAdding={true} />
                <FilterRow visible />
                <HeaderFilter visible />
                <Column dataField="meter_name" caption="Meter" alignment="center" />
                <Column dataField="poles_r" caption="Poles R" alignment="center" />
                <Column dataField="poles_y" caption="Poles Y" alignment="center" />
                <Column dataField="poles_b" caption="Poles B" alignment="center" />
                <Column dataField="group" caption="Group" alignment="center" />
                <Column dataField="period_type" caption="Period Type" alignment="center">
                    <Lookup
                        dataSource={PERIOD_TYPES}
                        valueExpr="type"
                        displayExpr="type"
                    />
                </Column>
                <Column dataField="lat" caption="Lat." alignment="center" />
                <Column dataField="lon" caption="Lon." alignment="center" />
                <Column dataField="sunrise_offset" caption="Sunrise Off." alignment="center" />
                <Column dataField="sunset_offset" caption="Sunset Off." alignment="center" />
                <Column dataField="on_time" caption="On Time" alignment="center">
                    <PatternRule
                        message={'24 Hours Format 15:00'}
                        pattern={/^([01]\d|2[0-3]):?([0-5]\d)$/}
                    />
                </Column>
                <Column dataField="off_time" caption="Off Time" alignment="center">
                    <PatternRule
                        message={'24 Hours Format 15:00'}
                        pattern={/^([01]\d|2[0-3]):?([0-5]\d)$/}
                    />
                </Column>
                <MasterDetail
                    enabled={true}
                    component={Parameters}
                />
                {/* <Column dataField="off_time" caption="Off Time" alignment="center" dataType="datetime" format="HH:mm" /> */}
            </DataGrid>
        </div>
    )
}