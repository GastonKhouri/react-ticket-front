import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Button, Divider } from 'antd';

import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

const DesktopPage = () => {

    const navigate = useNavigate();
    useHideMenu( false );

    const [ user ] = useState( getUserStorage() );

    const exit = () => {

        localStorage.clear();
        navigate( '/enter' );

    };

    const nextTicket = () => {

        console.log( 'siguiente' );

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

            <Row>
                <Col>
                    <Text> Esta atendiendo al cliente numero: </Text>

                    <Text
                        style={ { fontSize: 30 } }
                        type='danger'
                    >
                        55
                    </Text>
                </Col>
            </Row>

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
