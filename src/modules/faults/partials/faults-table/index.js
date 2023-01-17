import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, FilterRow, HeaderFilter, Export } from "devextreme-react/data-grid"

export default function FaultsTable(props){
    const {faults} = props
    return (
        <div>
            <DataGrid
                dataSource={faults || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
            >
                <FilterRow visible />
                <HeaderFilter visible />
                <Export enabled={true} />
                <Column dataField="meter__meter_name" caption="Meter" alignment="center" />
                <Column dataField="fault_desc" caption="Description" alignment="center" />
                <Column dataField="fault_loc" caption="Location" alignment="center" />
                <Column dataField="created_on" caption="Created On" alignment="center" />
            </DataGrid>
        </div>
    )
}