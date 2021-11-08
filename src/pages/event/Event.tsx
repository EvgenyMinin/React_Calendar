import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { EventCalendar, EventModal } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import { fetchGuests } from '../../store/reducers/event/actionCreators';

export const Event = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { guests } = useAppSelector((state) => state.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGuests());
    }, []);

    return (
        <Row justify="center" align="middle" className="content">
            <Card>
                <EventCalendar events={[]} />
                <Row justify="center">
                    <Button type="primary" onClick={() => setIsVisible(true)} icon={<PlusOutlined />}>
                        Добавить событие
                    </Button>
                </Row>
                <Modal title="Новое событие" visible={isVisible} centered onCancel={() => setIsVisible(false)} footer={null}>
                    <EventModal guests={guests} />
                </Modal>
            </Card>
        </Row>
    );
};
