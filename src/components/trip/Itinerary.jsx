import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton, TextField, Menu, MenuItem, Paper } from '@material-ui/core';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Event from "./Event";

const Container = styled(Paper)({
  margin: '8px',
  borderRadius: '0.5em',
  backgroundColor: 'white',
  width: '360px',
  minWidth: '360px',
  display: 'flex',
  flexDirection: 'column',
  height: '98vh',
  boxSizing: 'border-box',
});

const Title = styled('h3')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0.5em 1em 1em',
  borderBottom: '1px solid lightgrey',
  marginBottom: '0.5em',
});

const TaskList = styled('div')({
  padding: '8px',
  transition: 'background-color .2s ease',
  backgroundColor: 'inherit',
  flexGrow: '1',
  minHeight: '100px',
  height: '100%',
  overflow: 'scroll',
  boxSizing: 'border-box',
  '&::-webkit-scrollbar': {
    display: 'none',
  }
});

const AddButton = styled(IconButton)({
  marginLeft: 'auto',
  cursor: 'pointer',
})

const InnerList = React.memo((props) => {
  const { updateEvent, itineraryId, events } = props;
  return events.map((event, index) => (
        <Event
          key={event._id}
          event={event}
          index={index}
          updateEvent={updateEvent}
          itineraryId={itineraryId}
        />
      ));
});

function Itinerary({ itinerary, index, handleClickTitle, addEventClick, deleteItineraryClick }) {
  const [title, setTitle] = useState(itinerary.title);
  const [editField, setEditField] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = (e) => {
    console.log('Menu Item:', e.target.id);

    if (e.target.id === 'add') {
      addEventClick(itinerary._id);
    } else if (e.target.id === 'delete') {
      deleteItineraryClick(itinerary._id);
    }
    setAnchorEl(null);
  }

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
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          elevation={snapshot.isDragging ? 7 : 3}
        >
          {
            editField
            ? (
              <Title {...provided.dragHandleProps}>
                <TextField
                  defaultValue={itinerary.title}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
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
                <AddButton
                  component="span"
                  size="small"
                  disableRipple={true}
                  onClick={openMenu}
                >
                  <MoreVertIcon style={{fontSize: 24, marginLeft: '.1em'}} />
                </AddButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={closeMenu}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem id="add" onClick={closeMenu}>
                    <AddIcon fontSize="small" style={{marginRight: 'auto'}} />
                    Add Event
                  </MenuItem>
                  <MenuItem id="delete" onClick={closeMenu}>
                    <DeleteForeverIcon fontSize="small" style={{marginRight: '1em'}} />
                    Delete Itinerary
                  </MenuItem>
                </Menu>
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
                <InnerList
                  events={itinerary.events}
                  updateEvent={addEventClick}
                  itineraryId={itinerary._id}
                />
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
