// app/DashboardProntuarioContext.js
import { createContext, useState, useContext } from 'react';

const DashboardProntuarioContext = createContext();

export const DashboardProntuarioProvider = ({ children }) => {
    const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });

    return (
        <DashboardProntuarioContext.Provider value={{ keys, setKeys }}>
            {children}
        </DashboardProntuarioContext.Provider>
    );
};

export const useDashboardProntuario = () => useContext(DashboardProntuarioContext);
