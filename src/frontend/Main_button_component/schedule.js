import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import data from './schedule_drag_drop/Data';
import Column from './schedule_drag_drop/Column';

class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.state = {
      ...this.state,
      popUpBar: "",
    }

    this.popUp = this.popUp.bind(this);

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
    if (sourceColumn === destinationColumn) {
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
    if (sourceColumn.id === "column-1" && destinationColumn.id === "column-2") {

      if (this.state.columns["column-2"].taskIds.length === 8) {

        toast.warn("Too many events!");
        return;
      }

      const newId = draggableId[0] + this.state.index[draggableId[0]];

      newDestinationTaskIds.splice(destination.index, 0, newId);

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      }

      const newState = {
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [newId]: { id: newId, content: this.state.tasks[draggableId].content },
        },
        columns: {
          ...this.state.columns,
          [newDestinationColumn.id]: newDestinationColumn,
        },
        index: {
          ...this.state.index,
          [draggableId[0]]: this.state.index[draggableId[0]] + 1,
        }
      };

      this.setState(newState);
      return;

    }

    //from col 1 to col 3
    if (sourceColumn.id === "column-1" && destinationColumn.id === "column-3") {

      return;

    }

    //from col 2 to col 3
    if (sourceColumn.id === "column-2" && destinationColumn.id === "column-3") {
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

  popUp(option) {
    const plan = this.state.columns['column-2'].taskIds.map(s => s[0]);
    if (option === "confirm")
      return (
        <div>
          <div id="shadowLayer2"></div>
          <div className="popUp" id="confirmWindow">
            <h4>Are you sure to submit this plan?</h4>
            <br></br>
            <div className="d-flex justify-content-around">
              <button className="btn btn-light" onClick={() => { this.props.handleSchedulePlan(plan); this.props.popMainEvent(); this.props.setOverflow(1); }}>Yes</button>
              <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "" }); this.props.setOverflow(1); }}>No</button>
            </div>
          </div>
        </div>
      )
  }

  render() {
    require('./schedule.css');
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
    return (
      <div>
        <div className="schedule">
          <h2>Schedule</h2>
          <h3>Drag and drop to plan your schedule!</h3>
          <div className="content">
            <div className="d-flex justify-content-evenly">
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
            <p className="leftText">Note: You can plan at most 8 events.</p>
            <button className="confirm" onClick={() => { this.setState({ popUpBar: "confirm" }); this.props.setOverflow(0); }}>Done!</button>
          </div>
        </div>
        {this.popUp(this.state.popUpBar)}

      </div>
    );
  }
}

export default Schedule




