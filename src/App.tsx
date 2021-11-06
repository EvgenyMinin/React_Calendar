import { Layout } from 'antd';
import React from 'react';

import { AppRouter, Navbar } from './components';

import './App.css';

const App = () => {
    return (
        <Layout>
            <Navbar />
            <Layout.Content className="content">
                <AppRouter />
            </Layout.Content>
        </Layout>
    );
};

export default App;
