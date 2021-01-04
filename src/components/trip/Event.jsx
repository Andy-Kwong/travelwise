import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Draggable } from "react-beautiful-dnd";
import Info from "./Info";
import {IconButton} from "@material-ui/core";

const Item = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid lightgrey',
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
          bg={snapshot.isDragging ? 'lightgreen' : 'white'}
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
