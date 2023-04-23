import Button from "@src/components/button"

export default function AddGraphs(props){
    const {addGraph} = props
    
    const GRAPHS = [
        {
            type: "bar",
            name: "Bar graph",
            text: "Add bar graph"
        },
        {
            type: "line",
            name: "Line chart",
            text: "Add line chart"
        },
        {
            type: "comparison",
            name: "Comparison",
            text: "Add comparison graph"
        },
        {
            type: "histogram",
            name: "Histogram",
            text: "Add histogram"
        },
        {
            type: "radar",
            name: "Radar chart",
            text: "Add radar chart"
        },
        {
            type: "sum",
            name: "Sum line chart",
            text: "Add sum line chart"
        },
        {
            type: "2d",
            name: "2d line plot",
            text: "Add 2d line plot"
        }
    ]
    return (
        <div className="flex justify-center items-center p-5">
            {
                GRAPHS.map((item, key) => {
                    return (
                        <div key={key} className="mr-5">
                            <Button variant="secondary" {...item} attrs={{onClick: () => addGraph(item.type)}}/>
                        </div>
                    )
                })
            }
        </div>
    )
}