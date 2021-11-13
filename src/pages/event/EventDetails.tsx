import { Button, Card, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useParams } from 'react-router-dom';

import { useDeleteEventMutation } from '../../api/UserService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Event } from '../../models';
import { setEvents } from '../../store/reducers/event';

interface routeParams {
    date: string;
}

export const EventDetails = () => {
    const { date } = useParams<routeParams>();
    const { events } = useAppSelector((state) => state.events);
    const dispatch = useAppDispatch();
    const [deleteEvent] = useDeleteEventMutation();

    const currentEvents = events.filter((event) => event.date === date);

    const deleteEventHandler = (currEv: Event) => {
        deleteEvent(currEv);
        const filteredEvent = events.filter((event) => event.id !== currEv.id);
        dispatch(setEvents(filteredEvent));
    };

    const renderEvents = () => {
        return currentEvents.length > 0 ? (
            currentEvents.map((event) => (
                <Card className="eventItemContainer">
                    <Row justify="space-between" align="middle">
                        <div>{event.description}</div>
                        <Button danger onClick={() => deleteEventHandler(event)}>
                            Удалить
                        </Button>
                    </Row>
                </Card>
            ))
        ) : (
            <Text>Для выбранной даты нет событий</Text>
        );
    };
    return (
        <Row justify="center">
            <Col xs={22} md={6}>
                {renderEvents()}
            </Col>
        </Row>
    );
};
