/**************************************************************************************** 
This component displays each item in a column in a schedule.
The items are also allowed to be dragged by introducing a draggable region.
****************************************************************************************/

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {

  getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.001s`,         // makes animation time super tiny
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
