import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventForm from "../EventModal/EventForm";
import EditEvent from "../EventModal/EditEventForm";
import DeleteEvent from "../EventModal/DeleteEventForm";
import "./individualPage.css";

function TripDateCard({ events, tripDate }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Get tripdate day of week in a string
  const dayNum = tripDate?.getUTCDay();
  let day;
  switch (dayNum) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Not a day";
      break;
  }

  return (
    <>
      <div className="tripDateCard-container">
        <h1 className="tripDate-container">
          {tripDate?.getUTCMonth() + 1} / {tripDate?.getUTCDate()} - {day}
        </h1>
        {events &&
          events.map((event) => (
            <div className="event-container" key={event.id}>
              <div className="eventinside-container">
                <div className="flex-child eventImage-container">
                  <img
                    src={event?.imageUrl}
                    alt={`${event?.name} alt`}
                    className="eventImage"
                  />
                </div>
                <div className="flex-child eventDetail-container">
                  <div className="eventName">
                    <h2>{event?.name}</h2>
                  </div>
                  <div className="eventLocation">
                    <h3>Address: {event?.location}</h3>
                  </div>

                  <div className="eventDescription">
                    <h4>{event?.description}</h4>
                  </div>
                  <div className="eventDate">
                    <h4>
                      {event?.startDate.slice(0, 17)} to{" "}
                      {event?.endDate.slice(0, 17)}
                    </h4>
                  </div>
                  <div className="buttons">
                    <div className="buttonAction">
                      <button
                        className="editEventButton"
                        onClick={(e) => setShowEditModal(!showEditModal)}
                      >
                        Edit Event
                      </button>
                      {showEditModal && (
                        <Modal onClose={() => setShowEditModal(false)}>
                          <EditEvent
                            closeModal={() => setShowEditModal(false)}
                            event={event}
                          />
                        </Modal>
                      )}
                      <button
                        className="deleteEventButton"
                        onClick={(e) => setShowDeleteModal(true)}
                      >
                        Delete Event
                      </button>
                      {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                          <DeleteEvent
                            hideModal={() => setShowDeleteModal(false)}
                            event={event}
                          />
                        </Modal>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button
          className="eventButton"
          onClick={() => setShowModal(!showModal)}
        >
          Add An Event
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EventForm closeModal={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default TripDateCard;
