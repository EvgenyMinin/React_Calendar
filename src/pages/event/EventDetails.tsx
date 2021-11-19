import { Button, Card, Col, Popconfirm, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useHistory, useParams } from 'react-router-dom';

import { useDeleteEventMutation } from '../../api/UserService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Event } from '../../models';
import { RouteNames } from '../../router';
import { setEvents } from '../../store/reducers/event';

interface routeParams {
    date: string;
}

export const EventDetails = () => {
    const { date } = useParams<routeParams>();
    const { events } = useAppSelector((state) => state.events);
    const dispatch = useAppDispatch();
    const [deleteEvent] = useDeleteEventMutation();
    const router = useHistory();

    const currentEvents = events.filter((event) => event.date === date);

    const deleteEventHandler = (currEv: Event) => {
        deleteEvent(currEv);
        const filteredEvent = events.filter((event) => event.id !== currEv.id);
        dispatch(setEvents(filteredEvent));
    };

    const renderEvents = () => {
        return currentEvents.length > 0 ? (
            <Row justify="center">
                <Col span={24}>
                    {currentEvents.map((event) => (
                        <Card className="eventItemContainer">
                            <Row justify="space-between" align="middle">
                                <div>{event.description}</div>
                                <Popconfirm title="Вы действительно хотите удалить это событие?" onConfirm={() => deleteEventHandler(event)} okText="Да" cancelText="Нет">
                                    <Button danger>Удалить</Button>
                                </Popconfirm>
                            </Row>
                        </Card>
                    ))}
                </Col>
                <Col>
                    <Button type="primary" onClick={() => router.push(RouteNames.EVENTS)}>
                        Назад
                    </Button>
                </Col>
            </Row>
        ) : (
            <>
                <Row justify="center">
                    <Text>Для выбранной даты нет событий</Text>
                </Row>
                <Row justify="center">
                    <Button type="primary" onClick={() => router.push(RouteNames.EVENTS)}>
                        Назад
                    </Button>
                </Row>
            </>
        );
    };
    return (
        <Row justify="center">
            <Col xs={22} md={12}>
                {renderEvents()}
            </Col>
        </Row>
    );
};
