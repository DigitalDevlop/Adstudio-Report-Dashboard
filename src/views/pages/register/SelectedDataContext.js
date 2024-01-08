// SelectedDataContext.js
import { createContext, useContext, useState } from 'react';

const SelectedDataContext = createContext();

export const useSelectedData = () => {
    return useContext(SelectedDataContext);
};

export const SelectedDataProvider = ({ children }) => {
    const [selectedData, setSelectedData] = useState([]);

    const addSelectedData = (data) => {
        setSelectedData((prevData) => [...prevData, ...data]);
    };

    const clearSelectedData = () => {
        setSelectedData([]);
    };

    return (
        <SelectedDataContext.Provider value={{ selectedData, addSelectedData, clearSelectedData }}>
            {children}
        </SelectedDataContext.Provider>
    );
};
