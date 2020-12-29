const result = {
  draggableId: 'task-1',
  type: 'TYPE',
  reason: 'DROP or CANCEL',
  source: {
    droppableId: 'column-1',
    index: 0, // started in column 1 at index 0
  },
  destination: { // destination can be null if user drops outside of list
    droppableId: 'column-1',
    index: 1, // ended in column 1 at index 1
  },
};
