import moment, { Moment } from 'moment';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFetchAllUsersQuery } from '../api/UserService';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { Event, User } from '../models';
import { setGuests } from '../store/reducers/event';
import { formatDate } from '../utils/formatDate';
import { rules } from '../utils/rules';

import './EventModal.css';

interface EventModalProps {
    guests: User[];
    submit: (event: Event) => void;
}

export const EventModal = ({ guests, submit }: EventModalProps) => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useFetchAllUsersQuery();

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(setGuests(data));
        }
        // eslint-disable-next-line
    }, [isLoading]);

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

    const disabledDate = (currentDate: Moment) => {
        return currentDate && currentDate < moment().endOf('day');
    };

    return (
        <Form layout="vertical" onFinish={submitForm}>
            <Form.Item label="Описание события" name="description" rules={[rules.required('Пожалуйста, укажите событие')]}>
                <Input
                    placeholder="Событие"
                    value={event.description}
                    onChange={(e) => {
                        setEvent({ ...event, description: e.target.value });
                    }}
                />
            </Form.Item>

            <Row>
                <Col xs={24} md={12}>
                    <Form.Item label="Дата события" name="date" rules={[rules.required('Пожалуйста, укажите дату события')]}>
                        <DatePicker disabledDate={disabledDate} onChange={(date) => selectDate(date)} className="datePicker" />
                    </Form.Item>
                </Col>
            </Row>

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
