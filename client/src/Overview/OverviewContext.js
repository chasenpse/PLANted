import {createContext, useState} from 'react';
import * as dateUtils from "../utils/formatDate";

export const OverviewContext = createContext(null);

export const OverviewProvider = ({children}) => {

    const [calData, setCalData] = useState({
        markers: new Set(),
        data: []
    });

    const currentDate = new Date();
    const tmpEndDate = new Date(currentDate).setMonth(currentDate.getMonth() + 5);

    const [instances, setInstances] = useState();
    const [selected, setSelected] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(dateUtils.fullDateToYYYYMM(currentDate));
    const [endDate, setEndDate] = useState(dateUtils.fullDateToYYYYMM(tmpEndDate));

    return (
        <OverviewContext.Provider value={{calData, setCalData, instances, setInstances, selected, setSelected, loading, setLoading, startDate, setStartDate, endDate, setEndDate}}>
            {children}
        </OverviewContext.Provider>
    )
}