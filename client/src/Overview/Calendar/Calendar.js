import './Calendar.css'

const Calendar = ({startDate, endDate, selected, setSelected}) => {

    const numberOfMonths = 1 + (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    const genMonthData = (i) => ({
        date: new Date(startDate.getFullYear(), startDate.getMonth() + i, 1),
        days: new Date(startDate.getFullYear(), 1+startDate.getMonth() + i, 0).getDate()
    })

    return (
        <div className={'calendarContainer'}>
            {
                [...Array(numberOfMonths)].map((month,i)=>{
                    const curr = genMonthData(i)
                    return (
                        <div className={"monthContainer"} key={i}>
                            <div className={'month'}>{curr.date.toLocaleString("default", {month: "long"})}</div>
                            <div className={"key"}>
                                <span>S</span>
                                <span>M</span>
                                <span>T</span>
                                <span>W</span>
                                <span>T</span>
                                <span>F</span>
                                <span>S</span>
                            </div>
                            <div className={"days"}>
                                {[...Array(curr.days)].map((day,j)=>{
                                    return (
                                        <div
                                            className={"day"}
                                            style={{ gridColumnStart: j===0 ?
                                                    curr.date.getDay()+1
                                                    : null }}
                                            key={j}
                                        >
                                            {j+1}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Calendar;