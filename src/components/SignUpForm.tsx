import { Button, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import { rules } from '../utils/rules';
import { RouteNames } from '../router';
import { User } from '../models';
import { useCreateUserMutation } from '../api/UserService';

export const SignUpForm = () => {
    const [createUser] = useCreateUserMutation();
    const router = useHistory();

    const submitHandler = async ({ username, password, id }: User) => {
        await createUser({ id, username, password });
        router.push(RouteNames.LOGIN);
    };

    return (
        <Form layout="vertical" onFinish={submitHandler}>
            <Row justify="center">
                <Typography.Title level={2} type="secondary">
                    Регистрация
                </Typography.Title>
            </Row>

            <Form.Item label="Имя" name="username" rules={[rules.required('Пожалуйста, введите имя пользователя')]}>
                <Input placeholder="Пользователь" />
            </Form.Item>

            <Form.Item label="Пароль" name="password" rules={[rules.required('Пожалуйста, введите пароль')]} hasFeedback>
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item
                label="Подтверждение пароля"
                name="confirm_password"
                rules={[
                    rules.required('Пожалуйста, подтвердите пароль'),
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error('Пароли не совпадают'));
                            }
                        },
                    }),
                ]}
                dependencies={['password']}
                hasFeedback
            >
                <Input.Password placeholder="Введите пароль еще раз" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<LoginOutlined />} block>
                    Зарегистрироваться
                </Button>
            </Form.Item>

            <Row justify="center">
                <Typography.Text>
                    Уже есть аккунт?&nbsp;
                    <Link to={RouteNames.LOGIN}>Войдите!</Link>
                </Typography.Text>
            </Row>
        </Form>
    );
};
