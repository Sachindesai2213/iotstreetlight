import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, FilterRow, HeaderFilter, ColumnChooser, Export } from "devextreme-react/data-grid"

export default function ReportsTable(props){
    const {reports} = props
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
                <Column dataField="meter__meter_name" caption="Meter" alignment="center" />
                <Column dataField="meter_id" caption="Meter#" alignment="center" />
                <Column dataField="v_r" caption="VR" alignment="center" />
                <Column dataField="v_y" caption="VY" alignment="center" />
                <Column dataField="v_b" caption="VB" alignment="center" />
                <Column dataField="c_r" caption="CR" alignment="center" />
                <Column dataField="c_y" caption="CY" alignment="center" />
                <Column dataField="c_b" caption="CB" alignment="center" />
                <Column dataField="p_r" caption="PR" alignment="center" />
                <Column dataField="p_y" caption="PY" alignment="center" />
                <Column dataField="p_b" caption="PB" alignment="center" />
                <Column dataField="pf" caption="PF" alignment="center" />
                <Column dataField="kvar" caption="KVAR" alignment="center" />
                <Column dataField="freq" caption="Freq." alignment="center" />
                <Column dataField="kwh" caption="KWH" alignment="center" />
                <Column dataField="kvah" caption="KVAH" alignment="center" />
                <Column dataField="inserted_on" caption="Inserted On" alignment="center" />
            </DataGrid>
        </div>
    )
}