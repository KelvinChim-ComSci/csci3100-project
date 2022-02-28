import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import data from './schedule_drag_drop/Data';
import Column from './schedule_drag_drop/Column';
import './schdule.css';

class Schedule extends React.Component {
  state = data;

  onDragStart = start => {
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    })
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;  //see example-result.js

    this.setState({
      homeIndex: null,
    })

    //same position or not droppable position
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = this.state.columns[source.droppableId];
    const destinationColumn = this.state.columns[destination.droppableId];

    //same col movement
    if (sourceColumn === destinationColumn){
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);  //remove 1 element at source.index
      newTaskIds.splice(destination.index, 0, draggableId);  //remove 0 element at destination.index, add draggableId to that position
  
      //update column
      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }
  
      //update whole state
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      };
  
      this.setState(newState);
      return;
    }

    //different col movement
    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newSourceTaskIds.splice(source.index, 1);  //remove 1 element at source.index
    newDestinationTaskIds.splice(destination.index, 0, draggableId);  //remove 0 element at destination.index, add draggableId to that position
    
    //update columns
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: newSourceTaskIds,
    }
    
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: newDestinationTaskIds,
    }
    
    //update whole state
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      }
    };

    this.setState(newState);
    return;
  };

  render() {
    return (
      <div className="schedule">
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        {this.state.columnOrder.map((columnId, index) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          const isDropDisabled = index === 2;
          return (
            <Column 
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </DragDropContext>
      </div>
    );
  }
}



/*
function displaySchedule(){
    return (
    <div className="schedule"> 
        <h1>Schedule</h1>
        <h2>Click on activities to plan your Ulife!</h2>
        <ul className="list-group">
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("gpa")}>Study</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("money")}>Part time</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("sports")}>Gym</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("happiness")}>Hang out with friends</li>
            <li className="list-group-item list-group-item-action">Rest</li>
        </ul>

    </div>
    );
}

*/

export default Schedule




