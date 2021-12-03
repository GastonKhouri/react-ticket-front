import { Ticket } from '../interfaces/ticketInterface';

export const getLastest = async () => {

    const resp = await fetch( `http://localhost:8080/lastest` );
    const { lastest } = await resp.json();

    return lastest as Ticket[];

};