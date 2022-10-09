
import { user } from "@src/api"
import Loader from "@src/components/loader";
import { getCookie } from "@src/utils/cookies";
import { logout_user } from "@src/utils/functions";
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    Editing,
    Lookup,
    PatternRule
} from 'devextreme-react/data-grid';
import { useState } from 'react';

const pageSizes = [10, 25, 50, 100];

const periodType = [
    { type: "Fixed" },
    { type: "Automatic" }
]

export default function Test() {

    const [data, setData] = useState([])

    const user_id = getCookie("user_id")

    const meters = user.meters.all(user_id)

    if(!meters){
        return <Loader/>
    }

    return (
        <div className="p-5">
            <button onClick={() => logout_user()}>Logout</button>
            <DataGrid
                dataSource={meters.data.meters || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
                onSaved={async (e) => {
                    e.changes[0].data.user_id = user_id
                    const response = await user.meters.create(e.changes[0].data)
                    console.log(response)
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
                        dataSource={periodType}
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
                {/* <Column dataField="off_time" caption="Off Time" alignment="center" dataType="datetime" format="HH:mm" /> */}
            </DataGrid>
        </div>
    );
}