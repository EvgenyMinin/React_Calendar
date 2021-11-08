import { Col, Layout, Menu, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RouteNames } from '../router';
import { logout } from '../store/reducers/auth';

export const Navbar = () => {
    const router = useHistory();
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const loginHandler = () => {
        router.push(RouteNames.LOGIN);
    };

    const logoutHandler = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(logout());
        router.push(RouteNames.LOGIN);
    };

    return (
        <Layout.Header className="header">
            <Row>
                {isAuth ? (
                    <>
                        <Col xs={16} md={20}>
                            <Text type="success">{user.username}</Text>
                        </Col>
                        <Col xs={8} md={4}>
                            <Menu theme="dark" mode="horizontal" selectable={false} style={{ justifyContent: 'flex-end' }}>
                                <Menu.Item key={1} onClick={logoutHandler}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </>
                ) : (
                    <Col span={24}>
                        <Menu theme="dark" mode="horizontal" selectable={false} style={{ justifyContent: 'flex-end' }}>
                            <Menu.Item key={1} onClick={loginHandler}>
                                Login
                            </Menu.Item>
                        </Menu>
                    </Col>
                )}
            </Row>
        </Layout.Header>
    );
};
