import {createContext, useState, useEffect } from 'react';
import axios from "axios";

export const ScheduleContext = createContext(null);

export const ScheduleProvider = ({children}) => {
    const [instances, setInstances] = useState();
    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();

    // Load the user's instances
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/instances/`);
                const {data} = res;
                setInstances(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // Load the user's crops
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/crops/1`);
                const {data} = res;
                setCrops(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <ScheduleContext.Provider value={[instances, setInstances, crops, setInstances, selected, setSelected]}>
            {children}
        </ScheduleContext.Provider>
    )
}

