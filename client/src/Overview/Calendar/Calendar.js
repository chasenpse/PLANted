import './Calendar.css'

const Calendar = ({startDate, endDate, selected}) => {

    const numberOfMonths = () => {
        // 1 + yearsDiff * 12 + monthDiff -- leading 1 is to always show 1 month, e.g. selecting same value for start/end
        return 1 + ((endDate.split('-')[0] - startDate.split('-')[0]) * 12) + (endDate.split('-')[1] - startDate.split('-')[1]);
    }

    return (
        <div className={'calendarContainer'}>
            {[...Array(numberOfMonths)].map((day,i)=>(
                <div className={"monthContainer"} key={i}>
                    <div className={'month'}>Month</div>
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
                        {[...Array(startDate.getDate())].map((day,j)=>{
                            console.log(startDate.getDay(),j)
                            return (
                                <div
                                    className={"day"}
                                    style={{ gridColumnStart: j===0 ? new Date(startDate.getFullYear(), startDate.getMonth(), 1).getDay()+1 : null }}
                                >
                                    {j+1}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Calendar;