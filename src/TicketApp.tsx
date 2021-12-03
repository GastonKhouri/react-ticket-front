import RouterPage from './pages/RouterPage';
import { UIProvider } from './context/UIContext';
import { SocketProvider } from './context/socketContext';

const TicketApp = () => {
    return (
        <SocketProvider>
            <UIProvider>
                <RouterPage />
            </UIProvider>
        </SocketProvider>
    );
};

export default TicketApp;
