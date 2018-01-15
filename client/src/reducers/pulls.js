const { find, merge, uniqBy } = require('lodash');


function updateById(pulls, id, changes) {
    const pr = find(pulls, { id });

    if (pr) {
        merge(pr, changes);
    }
}

export default (state = { 
    pulls: []
}, action) => {
    if (action.type !== 'pullRequest') {
        return state;
    }

    const { url, id, event } = action.payload; 

    switch (event) {
        /**
         * In the case of 'opened' this is a new PR that's come in since starting the service.
         */
        case 'opened':
            return {
                ...state,
                pulls: uniqBy([
                    ...state.pulls,
                    {
                        id,
                        url,
                        state: 'open'
                    }
                ], 'id')
            };

        /**
         * Subsequent updates are 'applied' to an existing PR that's already been stored.
         * Handle only the 'closed' event for now.
         */
        case 'closed':
            updateById(state.pulls, id, {
                state: 'closed'
            });

            console.log(state);
            return state;

        default: 
            return state;
    }
}