import { Card, Row } from 'antd';
import React from 'react';
import { LoginForm } from '../../components';

export const Login = () => {
    return (
        <Row justify="center" align="middle" className="content">
            <Card>
                <LoginForm />
            </Card>
        </Row>
    );
};
