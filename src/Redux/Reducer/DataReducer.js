const initialState = {
    data: [
        {
            id: 0,
            uri: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
            category: 'popular',
            fav: false
        }, // https://unsplash.com/photos/oO62CP-g1EA
        {
            id: 2,
            uri: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
            category: 'memories',
            fav: false
        }, // https://unsplash.com/photos/gKMmJEvcyA8
        {
            id: 3,
            uri: 'https://images.unsplash.com/photo-1587814213271-7a6625b76c33',
            category: 'common',
            fav: false
        }, // https://unsplash.com/photos/N7zBDF1r7PM
        {
            id: 4,
            uri: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4',
            category: 'memories',
            fav: false
        }, // https://unsplash.com/photos/GsGZJMK0bJc
        {
            id: 5,
            uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
            category: 'popular',
            fav: false
        }, // https://unsplash.com/photos/coIBOiWBPjk
    ],
    favData: [],
};

function DataReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload }
            break;
        case 'SET_FAV_DATA':
            return { ...state, favData: action.payload }
            break;
        default:
            return state;
    }
};

export default DataReducer;