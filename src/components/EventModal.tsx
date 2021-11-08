import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { User } from '../models';
import { rules } from '../utils/rules';

interface EventModalProps {
    guests: User[];
}

export const EventModal = ({ guests }: EventModalProps) => (
    <Form layout="vertical">
        <Form.Item label="Описание события" name="description" rules={[rules.required('Пожалуйста, укажите событие')]}>
            <Input placeholder="Событие" />
        </Form.Item>

        <Form.Item label="Дата события" name="date" rules={[rules.required('Пожалуйста, укажите дату события')]}>
            <DatePicker />
        </Form.Item>

        <Form.Item label="Пользователь" name="guest" rules={[rules.required('Пожалуйста, выберите пользователя')]}>
            <Select placeholder="Выберите пользователя">
                {guests.map(({ username }) => (
                    <Select.Option key={username} value={username}>
                        {username}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>

        <Row justify="end">
            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<AppstoreAddOutlined />}>
                    Добавить
                </Button>
            </Form.Item>
        </Row>
    </Form>
);
