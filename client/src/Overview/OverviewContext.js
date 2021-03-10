import {createContext, useState} from 'react';

export const OverviewContext = createContext(null);

export const OverviewProvider = ({children}) => {

    const [cal, setCal] = useState();
    const [instances, setInstances] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);

    return (
        <OverviewContext.Provider value={{cal, setCal, instances, setInstances, selected, setSelected, loading, setLoading}}>
            {children}
        </OverviewContext.Provider>
    )
}