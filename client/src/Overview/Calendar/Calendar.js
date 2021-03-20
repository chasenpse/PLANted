import './Calendar.css'
import * as dateUtils from '../../utils/formatDate'

const Calendar = ({startDate, endDate, selected, setSelected, markers}) => {

    const today = new Date();

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
                                {[...Array(curr.days)].map((d,j)=>{
                                    const day = new Date(curr.date.getFullYear(), curr.date.getMonth(), j+1)
                                    const classes = () => {
                                        const tmp = ["day"];
                                        if (markers.has(dateUtils.dateToYYYYMMDD(day))) {
                                            tmp.push("event")
                                        }
                                        if (day.toISOString() === selected.toISOString()) {
                                            tmp.push("selected")
                                        }
                                        if (day.toISOString() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()) {
                                            tmp.push("today")
                                        }
                                        return tmp.join(" ")
                                    }
                                    return (
                                        <div
                                            className={classes()}
                                            style={{ gridColumnStart: j===0 ?
                                                    curr.date.getDay()+1
                                                    : null }}
                                            key={j}
                                            onClick={e=>setSelected(day)}
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