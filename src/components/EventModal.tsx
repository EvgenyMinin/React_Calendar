import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { useState } from 'react';
import { useAppSelector } from '../hooks/redux';

import { Event, User } from '../models';
import { formatDate } from '../utils/formatDate';
import { rules } from '../utils/rules';

interface EventModalProps {
    guests: User[];
    submit: (event: Event) => void;
}

export const EventModal = ({ guests, submit }: EventModalProps) => {
    const [event, setEvent] = useState<Event>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as Event);

    const { user } = useAppSelector((state) => state.auth);

    const selectDate = (d: Moment | null) => {
        if (d) {
            setEvent({ ...event, date: formatDate(d) });
        }
    };

    const submitForm = () => {
        submit({ ...event, author: user.username });
    };

    return (
        <Form layout="vertical" onFinish={submitForm}>
            <Form.Item label="Описание события" name="description" rules={[rules.required('Пожалуйста, укажите событие')]}>
                <Input placeholder="Событие" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </Form.Item>

            <Form.Item label="Дата события" name="date" rules={[rules.required('Пожалуйста, укажите дату события')]}>
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>

            <Form.Item label="Гость" name="guest" rules={[rules.required('Пожалуйста, выберите гостя')]}>
                <Select placeholder="Выберите гостя" onChange={(guest: string) => setEvent({ ...event, guest })}>
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
};
