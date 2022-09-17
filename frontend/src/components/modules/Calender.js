import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // 追加
import jaLocale from '@fullcalendar/core/locales/ja';
import { useState, useEffect } from 'react'
import '../../css/style.css';

const Clender = (props) => {

    const events = props.calenderEvent;

    function convertDateStr(year, month ,day) {

        let yearStr = '' + year;
        let monthStr = '' + (month + 1);
        let dayStr = '' + day;

        if (monthStr.length < 2) {
            monthStr = '0' + monthStr;
        }
        if (dayStr.length < 2) {
            dayStr = '0' + dayStr;
        }

        let result = yearStr + monthStr + dayStr;
        return result;
      }

    return (
        <>
        <div id="calender">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale='ja'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek listWeek',
                }}
                events={events}
                eventClick={function (item, jsEvent, view) {
                    let startYear = item.event.start.getFullYear();
                    let startMonth = item.event.start.getMonth();
                    let startDay = item.event.start.getDate();
                    let startHour = item.event.start.getHours();
                    let startMinute = item.event.start.getMinutes();
                    let endHour = item.event.end.getHours();
                    let endMinute = item.event.end.getMinutes();

                    window.location = "/studying?" + "ymd=" + convertDateStr(startYear, startMonth ,startDay) + "&startHour=" + startHour + "&" + "startMinute=" + startMinute + "&endHour=" + endHour + "&endMinute=" + endMinute;
                }}
            />
            </div>
        </>
    );
};

export default Clender;