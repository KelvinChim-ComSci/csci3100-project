/**************************************************************************************** 
This file stores the initial data for schedule function in schedule.js.
Each item (task) contains an id which is represented by a character and a number, as well
as content storing the corresponding event.
The index stores the current number label for each item. 
When new item is created, the index is incremented to avoid repetition with previous
items, while the character still corresponds to the content.
Each column contains an id which labels the column number, a title, as well as an array
storing the items in that column.
Initial setting is column 1 contains the 5 different events and columns 2,3 are empty.
Last update: 29/4/2022 by Ku Nok Tik
****************************************************************************************/

const Data = {
    tasks: {
        's1': { id: 's1', content: 'Study'},
        'w1': { id: 'w1', content: 'Part time'},
        'g1': { id: 'g1', content: 'Gym'},
        'f1': { id: 'f1', content: 'Hang out with friends'},
        'r1': { id: 'r1', content: 'Rest'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Events',
            taskIds: ['s1', 'w1', 'g1', 'f1', 'r1'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Your Plan',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Discard',
            taskIds: [],
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],         // in case the columns are to be swapped
    index: {
        's': 2,
        'w': 2,
        'g': 2,
        'f': 2,
        'r': 2,
    }
}

export default Data;