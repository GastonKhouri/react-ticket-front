import { createContext, useState } from 'react';

interface ContextProps {
    hidden: boolean;
    showMenu: () => void;
    hideMenu: () => void;
}

export const UIContext = createContext( {} as ContextProps );

export const UIProvider = ( { children }: any ) => {

    const [ hidden, setHidden ] = useState( false );

    const showMenu = () => {
        setHidden( false );
    };

    const hideMenu = () => {
        setHidden( true );
    };

    return (
        <UIContext.Provider value={ {
            hidden,
            showMenu,
            hideMenu
        } }>
            { children }
        </UIContext.Provider>
    );
};