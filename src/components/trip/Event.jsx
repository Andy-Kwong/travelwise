import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'
import { Draggable } from "react-beautiful-dnd";
import Info from "./Info";

const Item = styled(Paper)({
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '2px',
  padding: '8px',
  marginBottom: '8px',
  backgroundColor: props => (
    props.isDragDisabled
      ? 'lightgrey'
      : props.bg),
  display: 'flex',
})


function Event({ event, index, updateEvent, itineraryId }) {
  const isDragDisabled = false; // props.task.id === 'task-1';

  const handleEdit = (data, toDelete = false) => {
    updateEvent(itineraryId, data, toDelete);
  };

  return (
    <Draggable
      draggableId={event._id}
      index={index}
      // isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Item
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          bg={snapshot.isDragging && 'white'}
          elevation={snapshot.isDragging ? 5 : 1}
          // isDragDisabled={isDragDisabled}
        >
          <Info
            event={event}
            isDragging={snapshot.isDragging}
            handleEdit={handleEdit}
          />
        </Item>
      )}
    </Draggable>
  )
}

export default Event;
