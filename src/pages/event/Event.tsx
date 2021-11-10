import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFetchAllUsersQuery } from '../../api/UserService';

import { EventCalendar, EventModal, Spinner } from '../../components';
import { setGuests } from '../../store/reducers/event';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Event as IEvent } from '../../models';

export const Event = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { data, isLoading } = useFetchAllUsersQuery();
    const { guests } = useAppSelector((state) => state.events);

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(setGuests(data));
        }
        // eslint-disable-next-line
    }, [isLoading]);

    const submit = (event: IEvent) => {
        console.log('event', event);
        setIsVisible(false);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Row justify="center" align="middle" className="content">
                    <Card>
                        <EventCalendar events={[]} />
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
