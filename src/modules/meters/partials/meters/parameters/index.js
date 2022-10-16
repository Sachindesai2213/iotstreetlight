import { user } from "@src/api"
import { getCookie } from "@src/utils/cookies"
import DataGrid, { Column, Editing, FilterRow, HeaderFilter, Lookup, MasterDetail, PatternRule } from "devextreme-react/data-grid"

const NOTIFY_OPTIONS = [
    { type: "Yes" },
    { type: "No" }
]

export default function Parameters(props){
    const {data: {data: {id, parameters}}} = props

    const user_id = getCookie("user_id")

    return (
        <DataGrid
          dataSource={parameters || []}
          allowColumnReordering
          allowFiltering
          rowAlternationEnabled
          showBorders
          showFilterRows
          onSaved={async (e) => {
              e.changes[0].data.meter_id = id
              e.changes[0].data.user_id = user_id
              const response = await user.meters.parameters.create(e.changes[0].data)
          }}
        >
            <Editing
                mode="row"
                // allowUpdating={true}
                // allowDeleting={true}
                allowAdding={true} />
            <FilterRow visible />
            <HeaderFilter visible />
            <Column dataField="parameter_name" caption="Parameter name" alignment="center" />
            <Column dataField="field_name" caption="Field name" alignment="center" />
            <Column dataField="min_thr" caption="Min threshold" alignment="center" />
            <Column dataField="max_thr" caption="Max threshold" alignment="center" />
            <Column dataField="notify" caption="Notify" alignment="center">
                <Lookup
                    dataSource={NOTIFY_OPTIONS}
                    valueExpr="type"
                    displayExpr="type"
                />
            </Column>
        </DataGrid>
    )
}