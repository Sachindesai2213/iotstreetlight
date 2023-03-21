import { user } from "@src/api";
import { getCookie } from "@src/utils/cookies";
import DataGrid, {
    Column,
    Editing,
    FilterRow,
    HeaderFilter,
    Lookup,
    MasterDetail,
    PatternRule,
} from "devextreme-react/data-grid";

const NOTIFY_OPTIONS = [{ type: "Yes" }, { type: "No" }];

export default function Parameters(props) {
    const {
        data: {
            data: { id, parameters, configurations },
        },
    } = props;

    const user_id = getCookie("user_id");

    return (
        <div className="grid grid-cols-2 gap-3">
            <DataGrid
                dataSource={parameters || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
                onSaved={async (e) => {
                    e.changes[0].data.device_id = id;
                    e.changes[0].data.user_id = user_id;
                    const response = await user.devices.parameters.create(
                        e.changes[0].data
                    );
                }}
            >
                <Editing
                    mode="row"
                    // allowUpdating={true}
                    // allowDeleting={true}
                    allowAdding={true}
                />
                <FilterRow visible />
                <HeaderFilter visible />
                <Column
                    dataField="name"
                    caption="Parameter name"
                    alignment="center"
                />
                <Column
                    dataField="key"
                    caption="Field name"
                    alignment="center"
                />
                <Column
                    dataField="min_thr"
                    caption="Min threshold"
                    alignment="center"
                />
                <Column
                    dataField="max_thr"
                    caption="Max threshold"
                    alignment="center"
                />
                <Column dataField="notify" caption="Notify" alignment="center">
                    <Lookup
                        dataSource={NOTIFY_OPTIONS}
                        valueExpr="type"
                        displayExpr="type"
                    />
                </Column>
            </DataGrid>
            <DataGrid
                dataSource={configurations || []}
                allowColumnReordering
                allowFiltering
                rowAlternationEnabled
                showBorders
                showFilterRows
                onSaved={async (e) => {
                    e.changes[0].data.device_id = id;
                    e.changes[0].data.user_id = user_id;
                    const response = await user.devices.configurations.create(
                        e.changes[0].data
                    );
                }}
            >
                <Editing
                    mode="row"
                    // allowUpdating={true}
                    // allowDeleting={true}
                    allowAdding={true}
                />
                <FilterRow visible />
                <HeaderFilter visible />
                <Column
                    dataField="name"
                    caption="Config. name"
                    alignment="center"
                />
                <Column
                    dataField="key"
                    caption="Field name"
                    alignment="center"
                />
                <Column
                    dataField="value"
                    caption="Value"
                    alignment="center"
                />
            </DataGrid>
        </div>
    );
}
