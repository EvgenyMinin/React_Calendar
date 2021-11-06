import { Col, Layout, Menu, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RouteNames } from '../router';
import { login, logout } from '../store/reducers/auth';

export const Navbar = () => {
    const router = useHistory();
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const loginHandler = () => {
        dispatch(login());
        router.push(RouteNames.EVENT);
    };

    const logoutHandler = () => {
        dispatch(logout());
        router.push(RouteNames.LOGIN);
    };

    return (
        <Layout.Header className="header">
            <Row>
                {isAuth ? (
                    <>
                        <Col xs={16} md={20}>
                            <Text type="success">User 1</Text>
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
