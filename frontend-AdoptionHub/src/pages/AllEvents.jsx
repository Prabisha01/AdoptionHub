import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllEventsApi } from '../apis/Api';
import './style/calendar.css';
import EventDetailsModal from './SingleEvent';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await getAllEventsApi();
      const fetchedEvents = response.data.events.map(event => ({
        id: event._id,
        title: event.eventTitle,
        start: new Date(event.eventDate).toISOString(),
        extendedProps: {
          content: event.eventContent,
          organizedBy: event.organizedBy,
          eventFileUrl: event.eventFileUrl,
          eventImageOneUrl: event.eventImageOneUrl,
          eventImageTwoUrl: event.eventImageTwoUrl
        }
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error Fetching Events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event);
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="bg-blue-500 cursor-pointer text-white rounded-md px-2 py-1 text-center">
        {eventInfo.event.title}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="100%"
        eventContent={renderEventContent} 
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        titleFormat={{ year: 'numeric', month: 'long' }} 
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
      />
      <EventDetailsModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default AllEvents;
