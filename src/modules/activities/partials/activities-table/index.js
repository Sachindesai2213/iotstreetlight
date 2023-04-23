import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, Editing, FilterRow, HeaderFilter, Lookup, PatternRule } from "devextreme-react/data-grid"

export default function ActivitiesTable(props){
    const {activities} = props
    const user_id = getCookie("user_id")
    return (
        <div className="p-5">
            <DataGrid
                dataSource={activities || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
            >
                <FilterRow visible />
                <HeaderFilter visible />
                <Column dataField="user.first_name" caption="Name" alignment="center" />
                <Column dataField="type" caption="Type" alignment="center" />
                <Column dataField="timestamp" caption="Timestamp" alignment="center" />
            </DataGrid>
        </div>
    )
}