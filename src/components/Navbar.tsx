import { Col, Layout, Menu, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../router';

export const Navbar = () => {
    const router = useHistory();
    const auth = true;
    return (
        <Layout.Header className="header">
            <Row justify="end">
                {auth ? (
                    <>
                        <Col span={3}>
                            <Text type="success">Имя пользователя</Text>
                        </Col>
                        <Col span={2}>
                            <Menu theme="dark" mode="horizontal" selectable={false}>
                                <Menu.Item key={1} onClick={() => console.log('logout')}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </>
                ) : (
                    <Col span={2}>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key={1} onClick={() => router.push(RouteNames.LOGIN)}>
                                Login
                            </Menu.Item>
                        </Menu>
                    </Col>
                )}
            </Row>
        </Layout.Header>
    );
};
