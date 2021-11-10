import { Layout } from 'antd';
import React, { useEffect } from 'react';

import { AppRouter, Navbar } from './components';
import { useAppDispatch } from './hooks/redux';
import { login } from './store/reducers/auth';
import { User } from './models';

import './App.css';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            dispatch(login({ username: localStorage.getItem('username' || '') } as User));
        }
        // eslint-disable-next-line
    }, []);

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
