
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      id="my-modal"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-300 hover:text-gray-500 focus:outline-none"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
            <img
              src={event.extendedProps.eventImageOneUrl}
              alt="Event Image 1"
              className="rounded-lg"
            />
            <img
              src={event.extendedProps.eventImageTwoUrl}
              alt="Event Image 2"
              className="rounded-lg"
            />
          </div>

          <div className="text-lg space-y-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              {event.title}
            </h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.start).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Day:</strong>{" "}
              {new Date(event.start).toLocaleDateString("en-GB", {
                weekday: "long",
              })}
            </p>
            <p>
              <strong>Description:</strong> {event.extendedProps.content}
            </p>
            <p>
              <strong>Organized by:</strong> {event.extendedProps.organizedBy}
            </p>
            <a
              href={event.extendedProps.eventFileUrl}
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
            >
              View Event Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
