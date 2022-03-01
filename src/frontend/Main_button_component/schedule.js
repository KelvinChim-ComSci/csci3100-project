import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import data from './schedule_drag_drop/Data';
import Column from './schedule_drag_drop/Column';
import './schedule.css';

class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.submitPlan = this.submitPlan.bind(this);
    this.state = data;
  }

  onDragStart = start => {
    
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

    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);

    //from col 1 to col 2
    if (sourceColumn.id === "column-1" && destinationColumn.id === "column-2"){  

      const newId = draggableId[0]+this.state.index[draggableId[0]];

      newDestinationTaskIds.splice(destination.index, 0, newId); 
  
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      }
      
      const newState = {
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [newId]: { id: newId, content: this.state.tasks[draggableId].content},
        },
        columns: {
          ...this.state.columns,
          [newDestinationColumn.id]: newDestinationColumn,
        },
        index: {
          ...this.state.index,
          [draggableId[0]]: this.state.index[draggableId[0]]+1,
        }
      };
  
      this.setState(newState);
      return;

    }

    //from col 1 to col 3
    if (sourceColumn.id === "column-1" && destinationColumn.id === "column-3"){   

      return;

    }

    //from col 2 to col 3
    if (sourceColumn.id === "column-2" && destinationColumn.id === "column-3"){   
      newSourceTaskIds.splice(source.index, 1);   
      
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      }
      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newSourceColumn.id]: newSourceColumn,
        }
      };
  
      this.setState(newState);
      return;

    }
  };

  submitPlan() {
    const plan = this.state.columns['column-2'].taskIds.map(s => s[0]);
    console.log(plan);      

    /*
    sequence of events stored in plan
    's'->study
    'w'->part time
    'g'->gym
    'f'->hang out with friends
    'r'->rest
    */
   
    return;
  }

  render() {
    return (
      <div>
      <div className="schedule">
        <h2>Schedule</h2>
        <h3>Drag and drop to plan your schedule!</h3>
        <div className="d-flex justify-content-center">
          <DragDropContext 
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

              const isDropDisabled = index === 0;
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
      </div>
      <button className="confirm" onClick={this.submitPlan}>Done!</button>
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




