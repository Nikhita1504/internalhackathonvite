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
    <div style={{ backgroundColor: "#1E1E2F", padding: "20px", borderRadius: "8px" }}>
  <h1 style={{ marginLeft: "20px", color: "#ffff", fontSize: "28px", fontWeight: "bold" }}>
    Scheduled Events
  </h1>
  <div style={{ width: '80%', margin: '20px auto', backgroundColor: "#2E2E3E", padding: "20px", borderRadius: "10px" }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{
        height: 600,
        color: "white",
        // border: "2px solid #66BB6A", 
        borderRadius: "8px",
        padding: "10px"
      }}
      selectable
      onSelectSlot={handleSelectSlot} // Slot selection to add events
      onSelectEvent={(event) => handleDeleteEvent(event)} 
      eventPropGetter={(event) => ({
        style: { cursor: 'pointer', backgroundColor: '#66BB6A', color: '#fff', borderRadius: '4px' } // Style for each event
      })}
    />
  </div>
  <ul style={{ marginTop: "20px", color: "#fff", padding: "0 20px" }}>

  </ul>
</div>

  );
};

export default CalendarComponent;
