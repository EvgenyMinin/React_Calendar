import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { useCreateEventMutation, useFetchAllEventsQuery } from '../../api/UserService';

import { EventCalendar, EventModal, Spinner } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import { Event as IEvent } from '../../models';

export const Event = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [createEvent] = useCreateEventMutation();
    const { data: events, isLoading } = useFetchAllEventsQuery();

    const { guests } = useAppSelector((state) => state.events);

    const submit = async (event: IEvent) => {
        await createEvent(event);
        setIsVisible(false);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Row justify="center" align="middle" className="content">
                    <Card>
                        <EventCalendar events={events} />
                        <Row justify="center">
                            <Button type="primary" onClick={() => setIsVisible(true)} icon={<PlusOutlined />}>
                                Добавить событие
                            </Button>
                        </Row>
                        <Modal title="Новое событие" visible={isVisible} centered onCancel={() => setIsVisible(false)} footer={null}>
                            <EventModal guests={guests} submit={submit} />
                        </Modal>
                    </Card>
                </Row>
            )}
        </>
    );
};
