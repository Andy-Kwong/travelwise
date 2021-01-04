import React, { useState, useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Itinerary from "./Itinerary";
import TripContext from "../../context/TripContext";
import { updateTrip, addEvent, addItinerary } from "../../context/api";

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'scroll',
  boxSizing: 'border-box',
})

const InnerList = React.memo((props) => {
  const { itinerary, index, key, handleClickTitle, addEventClick } = props;
  return <Itinerary
    key={key}
    itinerary={itinerary}
    index={index}
    handleClickTitle={handleClickTitle}
    addEventClick={addEventClick}
  />;
});

function Trip() {
  const { tripData, setTripData } = useContext(TripContext);
  const [homeIndex, setHomeIndex] = useState(null);

  // const onDragStart = () => {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // };
  //
  // const onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(data.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
  // };

  const onDragStart = start => {
    const homeIndex = tripData.order.indexOf(start.source.droppableId);

    setHomeIndex(homeIndex)
  }

  const onDragEnd = result => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    setHomeIndex(null);
    const { destination, source, draggableId, type } = result;

    console.log('result:', result);
    console.log('draggableId:', draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newItineraryOrder = Array.from(tripData.order);
      newItineraryOrder.splice(source.index, 1);
      newItineraryOrder.splice(destination.index, 0, result.draggableId);

      const newState = {
        ...tripData,
        order: newItineraryOrder,
      };
      setTripData(newState);
      updateTrip(newState._id, newState);
      return;
    }

    // Start and end columns
    const start = tripData.itineraries[source.droppableId];
    const finish = tripData.itineraries[destination.droppableId];

    // Move within same list
    if (start === finish) {
      const newEvents = Array.from(start.events);
      const event = tripData.itineraries[source.droppableId].events[source.index];
      newEvents.splice(source.index, 1);
      newEvents.splice(destination.index, 0, event);

      const newItinerary = {
        ...start,
        events: newEvents,
      };

      const newState = {
        ...tripData,
        itineraries: {
          ...tripData.itineraries,
          [newItinerary._id]: newItinerary,
        }
      }

      setTripData(newState);
      updateTrip(newState._id, newState);
      return;
    }

    // Moving from one list to another
    const startEvents = Array.from(start.events);
    const event = tripData.itineraries[source.droppableId].events[source.index];
    startEvents.splice(source.index, 1);
    const newStart = {
      ...start,
      events: startEvents,
    };

    const finishEvents = Array.from(finish.events);
    finishEvents.splice(destination.index, 0, event);
    const newFinish = {
      ...finish,
      events: finishEvents,
    };

    const newState = {
      ...tripData,
      itineraries: {
        ...tripData.itineraries,
        [newStart._id]: newStart,
        [newFinish._id]: newFinish,
      },
    };

    setTripData(newState);
    updateTrip(newState._id, newState);
  }

  const handleClickTitle = (itineraryId, newTitle) => {
    const updatedItinerary = {
      ...tripData.itineraries[itineraryId],
      title: newTitle,
    }
    const newState = {
      ...tripData,
      itineraries: {
        ...tripData.itineraries,
        [itineraryId]: updatedItinerary,
      }
    }
    setTripData(newState);
    updateTrip(newState._id, newState);
  };

  const addEventClick = async (itineraryId, event, toDelete) => {
    const newEvent = event || await addEvent({
      title: 'Insert Title',
      content: 'Edit Description',
      link: '',
      location: 'Add Location',
      address: 'Address',
      duration: 0,
      notes: 'N/A',
    });

    console.log('Updated Event:', event);

    const updatedEvents = [
      ...tripData.itineraries[itineraryId].events,
    ];

    if (!event) {
      updatedEvents.unshift(newEvent.data);
    } else if (toDelete) {
      for (let i = 0; i < updatedEvents.length; i++) {
        if (updatedEvents[i]._id === event) {
          updatedEvents.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < updatedEvents.length; i++) {
        if (updatedEvents[i]._id === event._id) {
          updatedEvents[i] = { ...event };
          break;
        }
      }
    }

    const newState = {
      ...tripData,
      itineraries: {
        ...tripData.itineraries,
        [itineraryId]: {
          ...tripData.itineraries[itineraryId],
          events: updatedEvents,
        }
      }
    }
    console.log('New State:', newState);
    setTripData(newState);
    updateTrip(newState._id, newState);
  };

  const addItinerary = () => {

  };

  return (
    tripData !== null
      && (<DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tripData.order.map((title, index) => {
                const itinerary = tripData.itineraries[title];
                // const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                // const isDropDisabled = index < homeIndex;

                return (
                  <InnerList
                    key={itinerary._id}
                    itinerary={itinerary}
                    // isDropDisabled={isDropDisabled}
                    index={index}
                    handleClickTitle={handleClickTitle}
                    addEventClick={addEventClick}
                  />
                )
              })}
              {provided.placeholder}
              <button onClick={addItinerary}>Add Itinerary</button>
            </Container>
          )}
        </Droppable>
      </DragDropContext>)
  )
}

export default Trip;
