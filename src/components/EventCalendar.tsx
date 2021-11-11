import { Calendar } from 'antd';
import React from 'react';
import { Event } from '../models';

interface EventCalendarProps {
    events: Event[] | undefined;
}

export const EventCalendar = ({ events }: EventCalendarProps) => {
    console.log('events cal', events);
    return <Calendar />;
};
