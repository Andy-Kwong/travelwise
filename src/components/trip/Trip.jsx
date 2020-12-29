import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from './newTravelData';
import Column from "./Column";

const Container = styled('div')({
  display: 'flex',
})

const InnerList = React.memo((props) => {
  const { column, index } = props;
  return <Column column={column} index={index} />;
});

function ExampleBoard() {
  const [data, setData] = useState(initialData);
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
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

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
      const newColumnOrder = Array.from(data.columnOrder);
      const event = data.columns[source.droppableId].events[source.index];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, event);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    // Start and end columns
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newEvents = Array.from(start.events);
      const event = data.columns[source.droppableId].events[source.index];
      newEvents.splice(source.index, 1);
      newEvents.splice(destination.index, 0, event);

      const newColumn = {
        ...start,
        events: newEvents,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      }

      setData(newState);
      // TODO: update DB with new list here
      return;
    }

    // Moving from one list to another
    const startEvents = Array.from(start.events);
    const event = data.columns[source.droppableId].events[source.index];
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
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
    // TODO: update DB with new list here
  }

  return (
    <DragDropContext
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
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              //const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

              // const isDropDisabled = index < homeIndex;

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  // isDropDisabled={isDropDisabled}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ExampleBoard;
