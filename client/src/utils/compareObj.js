export default (a,b) => {
    // sort two objects and compare JSON strings
    const aObj = Object.entries(a).sort()
    const bObj = Object.entries(b).sort()
    return JSON.stringify(aObj) === JSON.stringify(bObj)
}