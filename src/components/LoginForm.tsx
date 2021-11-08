import { Button, Form, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { LoginOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../models';
import { fetchUsers } from '../store/reducers/auth/actionCreators';
import { rules } from '../utils/rules';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector((state) => state.auth);

    const submitHandler = (user: User) => {
        dispatch(fetchUsers(user));
    };

    return (
        <Form layout="vertical" onFinish={submitHandler}>
            {error && <Text type="danger">{error}</Text>}
            <Form.Item label="Имя пользователя" name="username" rules={[rules.required('Пожалуйста, введите имя пользователя')]}>
                <Input />
            </Form.Item>

            <Form.Item label="Пароль" name="password" rules={[rules.required('Пожалуйста, введите пароль')]}>
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} icon={<LoginOutlined />}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};
