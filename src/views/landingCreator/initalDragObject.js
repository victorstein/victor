// example
const iniatialDataExample = {
    tasks: {
        '1a': { id: '1a', content: '1' },
        '2a': { id: '2a', content: '2' },
        '3a': { id: '3a', content: '3' },
        '4a': { id: '4a', content: '4' },
        '1b': { id: '1b', content: '1' },
        '2b': { id: '2b', content: '2' },
        '3b': { id: '3b', content: '3' },
        '4b': { id: '4b', content: '4' },
        '1c': { id: '1c', content: '1' },
        '2c': { id: '2c', content: '2' },
        '3c': { id: '3c', content: '3' },
        '4c': { id: '4c', content: '4' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Columnas A',
            taskIds: ['1a', '2a', '3a', '4a']
        },
        'column-2': {
            id: 'column-2',
            title: 'Columnas B',
            taskIds: ['1b', '2b', '3b', '4b']
        },
        'column-3': {
            id: 'column-3',
            title: 'Columnas C',
            taskIds: ['1c', '2c', '3c', '4c']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

// the real Object
const iniatialData = {
    tasks: {
        '1a': { id: '1a', content: '1' },
        '2a': { id: '2a', content: '2' },
        '3a': { id: '3a', content: '3' },
        '4a': { id: '4a', content: '3' },
        '5a': { id: '5a', content: '3' },
        '6a': { id: '6a', content: '3' }
    },
    columns: {
        'column-section': {
            id: 'column-section',
            title: 'Sections',
            taskIds: ['1a','2a','3a', '4a', '5a', '6a']
        },
        'column-landing': {
            id: 'column-landing',
            title: 'Landing Selected',
            taskIds: []
        }
    },
    columnOrder: ['column-section', 'column-landing']
}

export default iniatialData