export const dateToYYYYMMDD = (date) => {
    const v = date ? new Date(date) : new Date()
    return v.toISOString().split('T', 1);
}

export const fullDateToYYYYMM = (date) => {
    const v = date ? new Date(date) : new Date()
    const m = (v.getMonth()+1).toString();
    return `${v.getFullYear()}-${m.padStart(2, '0')}`;
}

export const YYYYMMtoFullDate = (date) => {
    const arr = date.split('-')
    console.log(arr[0], arr[1], 0);
    return new Date(arr[0], arr[1], 0)
}

export const formatHeader = (date) => {
    const v = date ? new Date(date) : new Date()
    return `${v.toLocaleString("default", {weekday: "long"})}`
}