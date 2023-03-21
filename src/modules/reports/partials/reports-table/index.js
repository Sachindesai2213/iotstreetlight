import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, FilterRow, HeaderFilter, ColumnChooser, Export } from "devextreme-react/data-grid"

export default function ReportsTable(props){
    const {reports, parameters} = props
    const user_id = getCookie("user_id")
    return (
        <div>
            <DataGrid
                dataSource={reports || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
            >
                <FilterRow visible />
                <HeaderFilter visible />
                <Export enabled={true} />
                <ColumnChooser enabled={true} mode="dragAndDrop" />
                <Column dataField="device__name" caption="Device" alignment="center" />
                <Column dataField="device_id" caption="Device#" alignment="center" />
                {!!parameters && (parameters.map(({key, name}) => {
                    return (
                        <Column key={key} dataField={key} caption={name} alignment="center" />
                    )
                })) }
                <Column dataField="inserted_on" caption="Inserted On" alignment="center" />
            </DataGrid>
        </div>
    )
}