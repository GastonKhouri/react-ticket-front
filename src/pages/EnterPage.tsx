import { useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router';

import useHideMenu from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

interface FormValues {
    agent: string;
    desktop: number;
}

const EnterPage = () => {

    const navigate = useNavigate();
    useHideMenu( false );

    const [ user ] = useState( getUserStorage() );

    const onFinish = ( { agent, desktop }: FormValues ) => {

        localStorage.setItem( 'agent', agent );
        localStorage.setItem( 'desktop', JSON.stringify( desktop ) );

        navigate( '/desktop' );
    };

    const onFinishFailed = ( errorInfo: any ) => {
        console.log( 'Failed:', errorInfo );
    };

    if ( user.agent && user.desktop ) {
        return <Navigate to='/desktop' />;
    }

    return (
        <>
            <Title level={ 2 }> Ingresar </Title>
            <Text> Ingrese su nombre y numero de escritorio </Text>
            <Divider />

            <Form
                name='basic'
                labelCol={ { span: 8 } }
                wrapperCol={ { span: 14 } }
                initialValues={ { remember: true } }
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                autoComplete='off'
            >
                <Form.Item
                    label='Nombre del agente'
                    name='agent'
                    rules={ [ { required: true, message: 'Por favor, ingrese su nombre' } ] }
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Escritorio'
                    name='desktop'
                    rules={ [ { required: true, message: 'Por favor, ingrese el numero de escritorio' } ] }
                >
                    <InputNumber min={ 1 } max={ 99 } />
                </Form.Item>

                <Form.Item wrapperCol={ { offset: 8, span: 14 } }>
                    <Button
                        type='primary'
                        htmlType='submit'
                        shape='round'
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EnterPage;
