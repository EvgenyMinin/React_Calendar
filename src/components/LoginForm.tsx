import { Alert, Button, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../models';
import { login, setError } from '../store/reducers/auth';
import { rules } from '../utils/rules';
import { useFetchAllUsersQuery } from '../api/UserService';
import { RouteNames } from '../router';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.auth);

    const { data, isLoading, isError } = useFetchAllUsersQuery();

    const submitHandler = ({ username, password }: User) => {
        const mockUser = data && data.find((u) => u.username === username && u.password === password);
        if (mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            dispatch(login(mockUser));
        } else {
            dispatch(setError('Вы ввели неправильное имя или пароль'));
        }
    };

    return (
        <Form layout="vertical" onFinish={submitHandler}>
            <Row justify="center">
                <Typography.Title level={2} type="secondary">
                    Вход
                </Typography.Title>
            </Row>

            {isError && <Alert message="Что-то пошло не так, попробуйте позже" type="error" showIcon />}

            <Form.Item label="Имя пользователя" name="username" rules={[rules.required('Пожалуйста, введите имя пользователя')]}>
                <Input placeholder="Пользователь" />
            </Form.Item>

            <Form.Item label="Пароль" name="password" rules={[rules.required('Пожалуйста, введите пароль')]}>
                <Input.Password placeholder="Пароль" />
            </Form.Item>
            {error && (
                <Form.Item>
                    <Alert message={error} type="error" showIcon />
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} icon={<LoginOutlined />} block>
                    Войти
                </Button>
            </Form.Item>

            <Row justify="center">
                <Typography.Text>
                    Еще нет аккунта?&nbsp;
                    <Link to={RouteNames.SIGN_UP}>Зарегистрируйтесь!</Link>
                </Typography.Text>
            </Row>
        </Form>
    );
};
