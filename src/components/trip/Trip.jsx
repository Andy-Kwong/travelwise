import React, { useState, useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Itinerary from "./Itinerary";
import TripContext from "../../context/TripContext";
import { updateTrip, addEvent, addItinerary } from "../../context/api";
import MenuBar from "./MenuBar";

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  overflow: 'scroll',
  boxSizing: 'border-box',
})

const NewItineraryButton = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
  minWidth: '100px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)'
  },
  marginLeft: 'auto'
});

const NewItineraryTitle = styled('h4')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0 1em 1em',
  borderBottom: '1px solid lightgrey',
  marginBottom: 'auto',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'relative',
  '&:after': {
    content: '""',
    textAlign: 'right',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%)',
  }
});

const NewItineraryText = styled('span')({
  marginBottom: 'auto',
})

const InnerList = React.memo((props) => {
  const { itinerary, index, key, handleClickTitle, addEventClick, deleteItineraryClick } = props;
  return <Itinerary
    key={key}
    itinerary={itinerary}
    index={index}
    handleClickTitle={handleClickTitle}
    addEventClick={addEventClick}
    deleteItineraryClick={deleteItineraryClick}
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

  const addItineraryClick = async () => {
    let newItinerary = {
      title: 'New Itinerary',
      description: '',
      events: [],
      notes: '',
    }
    newItinerary = await addItinerary(newItinerary);
    newItinerary = newItinerary.data;

    const newState = {
      ...tripData,
      itineraries: {
        ...tripData.itineraries,
        [newItinerary._id]: {
          ...newItinerary
        }
      },
      order: [
        ...tripData.order,
        newItinerary._id,
      ],
    }

    console.log('New State:', newState);
    setTripData(newState);
    updateTrip(newState._id, newState);
  };

  const deleteItineraryClick = async (itineraryId) => {
    const newState = {
      ...tripData,
    }

    newState.order.splice(newState.order.indexOf(itineraryId), 1);
    delete newState.itineraries[itineraryId];

    console.log(newState);
    setTripData(newState);
    updateTrip(newState._id, newState);
  }

  return (
    tripData !== null
      && (<DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
      <MenuBar title={tripData.title} dates={tripData.dates} />
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
                    deleteItineraryClick={deleteItineraryClick}
                  />
                )
              })}
              {provided.placeholder}
              <NewItineraryButton
                onClick={addItineraryClick}
              >
                <NewItineraryTitle>
                  New Itinerary
                </NewItineraryTitle>
                <AddIcon />
                <NewItineraryText>
                  Add Itinerary
                </NewItineraryText>
              </NewItineraryButton>
            </Container>
          )}
        </Droppable>
      </DragDropContext>)
  )
}

export default Trip;
