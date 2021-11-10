import { Row, Spin } from 'antd';
import React from 'react';

import './Spinner.css';

export const Spinner = () => {
    return (
        <Row justify="center" className="spinner" align="middle">
            <Spin size="large" />
        </Row>
    );
};
