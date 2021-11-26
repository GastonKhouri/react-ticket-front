import { createContext, useState } from 'react';

interface ContextProps {
    hidden: boolean;
    showMenu: () => void;
    hideMenu: () => void;
}

export const UIContext = createContext( {} as ContextProps );

export const UIProvider = ( { children }: any ) => {

    const [ hidden, sethidden ] = useState( false );

    const showMenu = () => {
        sethidden( false );
    };

    const hideMenu = () => {
        sethidden( true );
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