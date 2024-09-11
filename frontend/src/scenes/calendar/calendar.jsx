import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const location = useLocation();
  const { scheme, villageName } = location.state || {};
  const [events, setEvents] = useState([]);
  const [scheduled, setScheduled] = useState(false); // Track scheduling status

  useEffect(() => {
    if (scheme && villageName && !scheduled) {
      const newEvent = {
        title: `${scheme} in ${villageName}`,
        start: new Date(), // Current date/time
        end: new Date() // Current date/time
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setScheduled(true); // Mark as scheduled
    }
  }, [scheme, villageName, scheduled]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter Event Title');
    if (title) {
      const newEvent = {
        title: title,
        start: start,
        end: end
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      setEvents((prevEvents) => prevEvents.filter(event => event !== eventToDelete));
    }
  };

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Scheduled Events</h1>
      <div style={{ width: '80%', margin: '20px auto' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot} // Slot selection to add events
          onSelectEvent={(event) => handleDeleteEvent(event)} // Delete event on selection
          eventPropGetter={(event) => ({
            style: { cursor: 'pointer' } // Change cursor to indicate event is selectable
          })}
        />
      </div>
      <ul>
      
      </ul>
    </div>
  );
};

export default CalendarComponent;
