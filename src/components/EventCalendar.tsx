import { Calendar } from 'antd';
import { Moment } from 'moment';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { formatDate } from '../utils/formatDate';

export const EventCalendar = () => {
    const [selectedData, setSelectedData] = useState<Moment>();
    const { events } = useAppSelector((state) => state.events);
    const router = useHistory();

    const dateCellRender = (value: Moment) => {
        const currentDayEvents = events?.filter((event) => event.date === formatDate(value));

        return (
            <div>
                {currentDayEvents?.map((ev) => (
                    <div key={ev.id}>{ev.description}</div>
                ))}
            </div>
        );
    };

    const selectDateHandler = (currentDate: Moment) => {
        setSelectedData(currentDate);
        router.push(`/events/${currentDate.format('DD.MM.YYYY')}`);
    };

    return <Calendar dateCellRender={dateCellRender} value={selectedData} onSelect={selectDateHandler} />;
};
