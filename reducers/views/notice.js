// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import {ActionTypes} from 'utils/constants.jsx';

function hasBeenDismissed(state = {}, action) {
    switch (action.type) {
    case ActionTypes.DISMISS_NOTICE:
        return {...state, [action.data]: true};
    default:
        return state;
    }
}

export default combineReducers({
    hasBeenDismissed,
});
