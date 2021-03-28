import {createContext, useState} from 'react';

export const CropContext = createContext(null);

export const CropProvider = ({children}) => {

    const [crops, setCrops] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState({prop: "updatedAt", type: "date"});
    const [order, setOrder] = useState("desc");

    return (
        <CropContext.Provider value={{
            crops,
            setCrops,
            selected,
            setSelected,
            loading,
            setLoading,
            orderBy,
            setOrderBy,
            order,
            setOrder,
        }}>
            {children}
        </CropContext.Provider>
    )
}

