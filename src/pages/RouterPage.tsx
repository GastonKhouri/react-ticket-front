import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons';

import CreateTicketPage from './CreateTicketPage';
import EnterPage from './EnterPage';
import QueuePage from './QueuePage';
import DesktopPage from './DesktopPage';
import { UIContext } from '../context/UIContext';
import { useContext } from 'react';

const { Sider, Content } = Layout;

const RouterPage = () => {

	const { hidden } = useContext( UIContext );

	return (
		<BrowserRouter>

			<Layout style={ { height: '100vh' } }>
				<Sider
					collapsedWidth='0'
					breakpoint='md'
					hidden={ hidden }
				>
					<div className='logo' />
					<Menu theme='dark' mode='inline' defaultSelectedKeys={ [ '1' ] }>

						<Menu.Item key='1' icon={ <UserOutlined /> }>
							<Link to='/enter'> Ingresar </Link>
						</Menu.Item>

						<Menu.Item key='2' icon={ <VideoCameraOutlined /> }>
							<Link to='/queue'> Cola </Link>
						</Menu.Item>

						<Menu.Item key='3' icon={ <UploadOutlined /> }>
							<Link to='/create'> Crear Ticket </Link>
						</Menu.Item>

					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Content
						className='site-layout-background'
						style={ {
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						} }
					>

						<Routes>

							<Route path='enter' element={ <EnterPage /> } />
							<Route path='queue' element={ <QueuePage /> } />
							<Route path='create' element={ <CreateTicketPage /> } />
							<Route path='desktop' element={ <DesktopPage /> } />

							<Route path='/*' element={ <EnterPage /> } />

						</Routes>

					</Content>
				</Layout>
			</Layout>

		</BrowserRouter>
	);
};

export default RouterPage;
