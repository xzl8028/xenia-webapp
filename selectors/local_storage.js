// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getCurrentTeamId, getTeamByName} from 'xenia-redux/selectors/entities/teams';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';

import localStorageStore from 'stores/local_storage_store';

// getLastViewedChannelName combines data from the Redux store and localStorage to return the
// previously selected channel name, returning the default channel if none exists.
//
// See LocalStorageStore for context.
export const getLastViewedChannelName = (state) => {
    const userId = getCurrentUserId(state);
    const teamId = getCurrentTeamId(state);

    return localStorageStore.getPreviousChannelName(userId, teamId);
};

export const getPenultimateViewedChannelName = (state) => {
    const userId = getCurrentUserId(state);
    const teamId = getCurrentTeamId(state);

    return localStorageStore.getPenultimateChannelName(userId, teamId);
};

// getLastViewedChannelNameByTeamName combines data from the Redux store and localStorage to return
// the url to the previously selected channel, returning the path to the default channel if none
// exists.
//
// See LocalStorageStore for context.
export const getLastViewedChannelNameByTeamName = (state, teamName) => {
    const userId = getCurrentUserId(state);
    const team = getTeamByName(state, teamName);
    const teamId = team && team.id;

    return localStorageStore.getPreviousChannelName(userId, teamId);
};
