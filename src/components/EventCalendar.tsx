import { Calendar } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Event } from '../models';
import { formatDate } from '../utils/formatDate';

interface EventCalendarProps {
    events: Event[] | undefined;
}

export const EventCalendar = ({ events }: EventCalendarProps) => {
    const { username } = useAppSelector((state) => state.auth.user);
    const dateCellRender = (value: Moment) => {
        const currentDayEvents = events?.filter((event) => event.date === formatDate(value) && event.guest === username);
        return (
            <div>
                {currentDayEvents?.map((ev) => (
                    <div key={ev.id}>{ev.description}</div>
                ))}
            </div>
        );
    };

    return <Calendar dateCellRender={dateCellRender} />;
};
