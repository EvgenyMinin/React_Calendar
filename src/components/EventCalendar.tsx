import { Calendar } from 'antd';
import React from 'react';
import { Event } from '../models';

interface EventCalendarProps {
    events: Event[];
}

export const EventCalendar = ({ events }: EventCalendarProps) => {
    return <Calendar />;
};
