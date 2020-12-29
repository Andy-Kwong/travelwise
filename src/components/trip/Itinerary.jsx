import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled('div')({
  margin: '8px',
  border: '1px solid lightgrey',
  borderRadius: '2px',
  backgroundColor: 'white',
  width: '360px',
  display: 'flex',
  flexDirection: 'column',
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
});

const InnerList = React.memo((props) => {
  return props.events.map((event, index) => (
        <Task key={event.id} event={event} index={index} />
      ));
});

function Column({ column, index }) {
  return (
    <Draggable
      draggableId={column.id}
      index={index}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            // type={props.column.id === 'column-3' ? 'done' : 'active'}
            // isDropDisabled={props.isDropDisabled}
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList events={column.events} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column;
