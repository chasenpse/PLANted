import {createContext, useState, useEffect } from 'react';
import axios from "axios";

export const ScheduleContext = createContext(null);

export const ScheduleProvider = ({children}) => {

    const [instances, setInstances] = useState();
    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);

    // Load the user's instances
    useEffect(() => {
        (async () => {
            try {
                const instanceRes = await axios.get(`http://localhost:5000/api/instances/`);
                const cropRes = await axios.get(`http://localhost:5000/api/crops/1/names`);
                setInstances(instanceRes.data);
                setCrops(cropRes.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <ScheduleContext.Provider value={{instances, setInstances, crops, setCrops, selected, setSelected, loading, setLoading}}>
            {children}
        </ScheduleContext.Provider>
    )
}