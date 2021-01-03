import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Event from "./Event";

const Container = styled('div')({
  margin: '8px',
  border: '1px solid lightgrey',
  borderRadius: '2px',
  backgroundColor: 'white',
  width: '360px',
  display: 'flex',
  flexDirection: 'column',
  height: '98vh',
  boxSizing: 'border-box',
});

const Title =  styled('h3')({
  padding: '8px',
});

const TaskList = styled('div')({
  padding: '8px',
  transition: 'background-color .2s ease',
  backgroundColor: props => (props.isDraggingOver ? 'skyblue' : 'inherit'),
  flexGrow: '1',
  minHeight: '100px',
  height: '100%',
  overflow: 'scroll',
  boxSizing: 'border-box',
  '&::-webkit-scrollbar': {
    display: 'none',
  }
});

const InnerList = React.memo((props) => {
  return props.events.map((event, index) => (
        <Event key={event._id} event={event} index={index} />
      ));
});

function Itinerary({ itinerary, index }) {
  return (
    <Draggable
      draggableId={itinerary._id}
      index={index}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{itinerary.title}</Title>
          <Droppable
            droppableId={itinerary._id}
            // type={props.itinerary._id === 'itinerary-3' ? 'done' : 'active'}
            // isDropDisabled={props.isDropDisabled}
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList events={itinerary.events} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Itinerary;
