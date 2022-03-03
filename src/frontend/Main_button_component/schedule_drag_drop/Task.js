import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {

  getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  }
  
  render() {
    
    return (
      <div>
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}
        
      >
        {(provided,snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}    
            ref={provided.innerRef} 
            style={this.getStyle(provided.draggableProps.style, snapshot)}
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
