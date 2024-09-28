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
  const [scheduled, setScheduled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [eventTitle, setEventTitle] = useState(""); // Store event title
  const [selectedSlot, setSelectedSlot] = useState(null); // Store the selected slot for event creation
  const [deleteEvent, setDeleteEvent] = useState(null); // Store event for deletion confirmation

  useEffect(() => {
    if (scheme && villageName && !scheduled) {
      const newEvent = {
        title: `${scheme} in ${villageName}`,
        start: new Date(),
        end: new Date(),
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setScheduled(true);
    }
  }, [scheme, villageName, scheduled]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true); // Open the modal for entering event title
  };

  const handleAddEvent = () => {
    if (eventTitle && selectedSlot) {
      const newEvent = {
        title: eventTitle,
        start: selectedSlot.start,
        end: selectedSlot.end,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsModalOpen(false); // Close the modal
    setEventTitle(""); // Clear the event title input
  };

  const handleDeleteEvent = (eventToDelete) => {
    setDeleteEvent(eventToDelete); // Open delete confirmation modal
  };

  const confirmDeleteEvent = () => {
    setEvents((prevEvents) => prevEvents.filter((event) => event !== deleteEvent));
    setDeleteEvent(null); // Close the confirmation modal
  };

  const isToday = (date) => {
    const today = new Date();
    return moment(date).isSame(today, 'day');
  };

  return (
    <div style={{ backgroundColor: "#1E1E2F", padding: "20px", borderRadius: "8px" }}>
      <h1 style={{ marginLeft: "20px", color: "#fff", fontSize: "28px", fontWeight: "bold" }}>
        Scheduled Events
      </h1>
      <div style={{ width: '95%', margin: '20px auto', backgroundColor: "#FFBB28", padding: "20px", borderRadius: "10px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 600,
            color: "#ffffff",
            backgroundColor: "#3A3A48", // Calendar background
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #4A4A60", // Subtle border around calendar
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Shadow for depth
          }}
          selectable
          onSelectSlot={handleSelectSlot} // Slot selection to add events
          onSelectEvent={(event) => handleDeleteEvent(event)}
          eventPropGetter={(event) => ({
            style: {
              cursor: "pointer",
              backgroundColor: "#66BB6A", // Green background for events
              color: "#fff",
              borderRadius: "4px",
              padding: "2px 6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Shadow for event cards
            },
          })}
          dayPropGetter={(date) => ({
            style: {
              color: "#ffffff", // Day label text color
              backgroundColor: isToday(date) ? "#3C82F6" : "#3A3A48", // Mustard yellow for today
              borderColor: "#555", // Day cell borders
              borderRadius: isToday(date) ? "8px" : "0", // Rounded corners for today
            },
          })}
          headerPropGetter={() => ({
            style: {
              color: "#ffffff", // Header (weekdays, month names) in white
              fontWeight: "600",
              backgroundColor: "#2E2E3E", // Darker background for header
              borderBottom: "2px solid #555", // Border under the headers
            },
          })}
        />
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={{ color: "#333" }}>Add Event</h2>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
              style={modalStyles.input}
            />
            <button onClick={handleAddEvent} style={modalStyles.button}>
              Add Event
            </button>
            <button onClick={() => setIsModalOpen(false)} style={modalStyles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteEvent && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={{ color: "#333" }}>Confirm Deletion</h2>
            <p>Are you sure you want to delete this event?</p>
            <button onClick={confirmDeleteEvent} style={modalStyles.button}>
              Delete
            </button>
            <button onClick={() => setDeleteEvent(null)} style={modalStyles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styling
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    width: "400px",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#66BB6A",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CalendarComponent;
