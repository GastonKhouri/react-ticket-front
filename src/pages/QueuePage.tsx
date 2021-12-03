import { useContext, useEffect, useState } from 'react';
import { Typography, Row, Col, List, Card, Tag, Divider } from 'antd';

import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/socketContext';
import { Ticket } from '../interfaces/ticketInterface';
import { getLastest } from '../helpers/getLastes';

const { Title, Text } = Typography;

const QueuePage = () => {

    useHideMenu( true );

    const { socket } = useContext( SocketContext );
    const [ tickets, setTickets ] = useState<Ticket[]>( [] );

    useEffect( () => {

        getLastest().then( tickets => setTickets( tickets ) );

    }, [] );

    useEffect( () => {

        socket.on( 'last-13-tickets', ( tickets ) => {

            setTickets( tickets );

        } );

        return () => {
            socket.off( 'last-13-tickets' );
        };

    }, [ socket ] );

    return (
        <>
            <Title level={ 1 }> Atendiendo al cliente </Title>
            <Row>
                <Col span={ 12 }>
                    <List
                        dataSource={ tickets.slice( 0, 3 ) }
                        renderItem={ item => (
                            <List.Item>
                                <Card
                                    style={ { width: 300, marginTop: 16 } }
                                    actions={ [
                                        <Tag color='volcano'> { item.agent } </Tag>,
                                        <Tag color='magenta'> Escritorio: { item.desktop } </Tag>
                                    ] }
                                >
                                    <Title> No. { item.number } </Title>
                                </Card>
                            </List.Item>
                        ) }
                    />
                </Col>

                <Col span={ 12 }>

                    <Divider> Historial </Divider>
                    <List
                        dataSource={ tickets.slice( 3 ) }
                        renderItem={ item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={ `Ticket No. ${ item.number }` }
                                    description={
                                        <>
                                            <Text type='secondary'> En el escritorio: </Text>
                                            <Tag color='magenta'> { item.desktop } </Tag>
                                            <Text type='secondary'> Agente: </Text>
                                            <Tag color='volcano'> { item.agent } </Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        ) }
                    />

                </Col>
            </Row>
        </>
    );
};

export default QueuePage;
