import {createContext, useState, useEffect } from 'react';
import axios from "axios";

export const CropContext = createContext(null);

export const CropProvider = ({children}) => {

    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);

    // Load the user's instances
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/crops`);
                setCrops(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <CropContext.Provider value={{crops, setCrops, selected, setSelected, loading}}>
            {children}
        </CropContext.Provider>
    )
}

