import React from 'react';

function MainBoard(props) {
  function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(id);
    if (!e.target.previousSibling) {
      e.target.parentNode.insertBefore(draggedElement, e.target);
    } else if(e.target.nextSibling) {
      e.target.parentNode.insertBefore(draggedElement, e.target.nextSibling);
    } else {
      e.target.parentNode.appendChild(draggedElement);
    }
  }

  function enableDrop(e) {
    e.preventDefault();
  }
  return (
    <div>
      <ul id="list1" onDrop={handleDrop} onDragOver={enableDrop}>
        <li id="1" draggable={true} onDragStart={dragStart}>1</li>
        <li id="2" draggable={true} onDragStart={dragStart}>2</li>
        <li id="3" draggable={true} onDragStart={dragStart}>3</li>
        <li id="4" draggable={true} onDragStart={dragStart}>4</li>
        <li id="5" draggable={true} onDragStart={dragStart}>5</li>
      </ul>
      <ul id="list1" onDrop={handleDrop} onDragOver={enableDrop}>
        <li id="6" draggable={true} onDragStart={dragStart}>6</li>
        <li id="7" draggable={true} onDragStart={dragStart}>7</li>
        <li id="8" draggable={true} onDragStart={dragStart}>8</li>
        <li id="9" draggable={true} onDragStart={dragStart}>9</li>
        <li id="10" draggable={true} onDragStart={dragStart}>10</li>
      </ul>
    </div>
  );
}

export default MainBoard;
