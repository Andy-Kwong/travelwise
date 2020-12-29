import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from './travelData';
import Column from "./Column";

const Container = styled('div')({
  display: 'flex',
})

const InnerList = React.memo((props) => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
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
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
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
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
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
                  taskMap={data.pois}
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
};

export default ExampleBoard;
