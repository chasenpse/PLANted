export default [
    {label: "Crop", name: "cropId", type: "select"},
    {label: "Quantity", name: "quantity", type: "number", min: 1, max: 99, step: 1},
    {label: "Stages", name: "stages", type: "number", min: 1, max: 99, step: 1},
    {label: "Start Date", name: "startDate", type: "date"},
    {label: "End Date", name: "endDate", type: "date"},
    {label: "Notes", name: "notes", type: "textarea"},
]