import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Draggable } from "react-beautiful-dnd";
import Info from "./Info";

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

function Task(props) {
  const isDragDisabled = false; // props.task.id === 'task-1';
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
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
            title={props.task.title}
            description={props.task.content}
            location={props.task.location}
            link={props.task.link}
            time={props.task.length}
            isDragging={snapshot.isDragging}
          />
        </Item>
      )}
    </Draggable>
  )
}

export default Task;
