import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Button, Divider } from 'antd';

import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';
import { SocketContext } from '../context/socketContext';
import { Ticket } from '../interfaces/ticketInterface';

const { Title, Text } = Typography;

const DesktopPage = () => {

    useHideMenu( false );
    const navigate = useNavigate();
    const { socket } = useContext( SocketContext );

    const [ user ] = useState( getUserStorage() );
    const [ ticket, setTicket ] = useState<Ticket>();


    const exit = () => {

        localStorage.clear();
        navigate( '/enter' );

    };

    const nextTicket = () => {

        socket.emit( 'next-ticket-work', user, ( ticket: Ticket ) => {

            setTicket( ticket );

        } );

    };

    if ( !user.agent || !user.desktop ) {
        return <Navigate to='/enter' />;
    }

    return (
        <>
            <Row>

                <Col span={ 20 }>
                    <Title level={ 2 }> { user.agent } </Title>
                    <Text> Usted esta trabajando en el escritorio: </Text>
                    <Text type='success'> { user.desktop } </Text>
                </Col>

                <Col span={ 4 } style={ { display: 'flex', justifyContent: 'right' } }>
                    <Button
                        shape='round'
                        type='primary'
                        onClick={ exit }
                        danger
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>

            </Row>

            <Divider />

            {
                ticket &&
                <Row>
                    <Col>
                        <Text> Esta atendiendo al cliente numero: </Text>

                        <Text
                            style={ { fontSize: 30 } }
                            type='danger'
                        >
                            { ticket?.number }
                        </Text>
                    </Col>
                </Row>

            }


            <Row>

                <Col offset={ 18 } span={ 6 } style={ { display: 'flex', justifyContent: 'right' } }>
                    <Button
                        onClick={ nextTicket }
                        shape='round'
                        type='primary'
                    >
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>

            </Row>
        </>
    );
};

export default DesktopPage;
