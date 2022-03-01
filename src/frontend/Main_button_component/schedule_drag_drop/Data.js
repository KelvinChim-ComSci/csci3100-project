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
    columnOrder: ['column-1', 'column-2', 'column-3'],
    index: {
        's': 2,
        'w': 2,
        'g': 2,
        'f': 2,
        'r': 2,
    }
}

export default Data;