import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default class Column extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.column.title}</h3>
        <Droppable 
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled} //cannot drop on this column
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}         
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
