import { useContext, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button } from 'antd';

import useHideMenu from '../hooks/useHideMenu';
import { SocketContext } from '../context/socketContext';
import { Ticket } from '../interfaces/ticketInterface';

const { Title, Text } = Typography;

const CreateTicketPage = () => {

    useHideMenu( true );

    const { socket } = useContext( SocketContext );
    const [ ticket, setTicket ] = useState<Ticket>();

    const newTicket = () => {

        socket.emit( 'request-ticket', null, ( ticket: Ticket ) => {

            setTicket( ticket );

        } );

    };

    return (
        <>
            <Row>
                {/* @ts-ignore */ }
                <Col span={ 14 } offset={ 6 } align='center'>

                    <Title level={ 3 }>
                        Presione el boton para un nuevo ticket
                    </Title>

                    <Button
                        type='primary'
                        shape='round'
                        icon={ <DownloadOutlined /> }
                        size='large'
                        onClick={ newTicket }
                    >
                        Nuevo Ticket
                    </Button>

                </Col>
            </Row>

            {
                ticket &&
                <Row style={ { marginTop: 100 } }>

                    {/* @ts-ignore */ }
                    <Col span={ 14 } offset={ 6 } align='center'>

                        <Text>
                            Su número
                        </Text>

                        <br />

                        <Text type='success' style={ { fontSize: 55 } }>
                            { ticket?.number }
                        </Text>

                    </Col>

                </Row>
            }

        </>
    );
};

export default CreateTicketPage;
