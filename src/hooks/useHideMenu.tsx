import { useContext, useEffect } from 'react';
import { UIContext } from '../context/UIContext';

const useHideMenu = ( hide: boolean ) => {

    const { hideMenu, showMenu } = useContext( UIContext );

    useEffect( () => {

        hide
            ? hideMenu()
            : showMenu();

    }, [ hide, hideMenu, showMenu ] );

};

export default useHideMenu;
