import { Card, Col, Row } from 'antd';
import React from 'react';
import { LoginForm } from '../../components';

export const Login = () => {
    return (
        <Row justify="center" align="middle" className="content">
            <Col md={6}>
                <Card>
                    <LoginForm />
                </Card>
            </Col>
        </Row>
    );
};
