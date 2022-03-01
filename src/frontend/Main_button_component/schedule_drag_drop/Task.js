import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
  
  render() {
    
    return (
      <div>
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}
        
      >
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}    
            ref={provided.innerRef} 
            className="task"            
          >
            {this.props.task.content}
          </div>
          )
        }
      </Draggable>
      </div>

    );
  }
}
