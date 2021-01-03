import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { IconButton, TextField } from '@material-ui/core';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Event from "./Event";

const Container = styled('div')({
  margin: '8px',
  border: '1px solid lightgrey',
  borderRadius: '2px',
  backgroundColor: 'white',
  width: '360px',
  minWidth: '360px',
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

function Itinerary({ itinerary, index, handleClickTitle }) {
  const [title, setTitle] = useState(itinerary.title);
  const [editField, setEditField] = useState(false);
  const handleClick = (updateTitle = false) => {
    setEditField(!editField);
    updateTitle && handleClickTitle(itinerary._id, title);
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleClick(true);
  }

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
          {
            editField
            ? (
              <Title {...provided.dragHandleProps}>
                <TextField
                  defaultValue={itinerary.title}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <IconButton
                  component="span"
                  size="small"
                  disableRipple={true}
                  onClick={() => handleClick(true)}
                >
                  <DoneIcon />
                </IconButton>
              </Title>
              )
            : (
              <Title {...provided.dragHandleProps}>
                {itinerary.title}
                <IconButton
                  component="span"
                  size="small"
                  disableRipple={true}
                  onClick={handleClick}
                >
                  <EditIcon style={{fontSize: 16, marginLeft: '.1em'}} />
                </IconButton>
              </Title>
              )
          }
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
