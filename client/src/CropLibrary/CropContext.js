import {createContext, useState} from 'react';

export const CropContext = createContext(null);

export const CropProvider = ({children}) => {

    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);

    return (
        <CropContext.Provider value={{crops, setCrops, selected, setSelected, loading, setLoading}}>
            {children}
        </CropContext.Provider>
    )
}

