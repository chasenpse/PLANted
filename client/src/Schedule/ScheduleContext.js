import {createContext, useState} from 'react';

export const ScheduleContext = createContext(null);

export const ScheduleProvider = ({children}) => {

    const [instances, setInstances] = useState();
    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);

    return (
        <ScheduleContext.Provider value={{instances, setInstances, crops, setCrops, selected, setSelected, loading, setLoading}}>
            {children}
        </ScheduleContext.Provider>
    )
}