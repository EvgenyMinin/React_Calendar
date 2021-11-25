import { Card, Col, Row } from 'antd';
import React from 'react';

import { SignUpForm } from '../../components';

export const SignUp = () => {
    return (
        <Row justify="center" align="middle" className="content">
            <Col md={6}>
                <Card>
                    <SignUpForm />
                </Card>
            </Col>
        </Row>
    );
};
