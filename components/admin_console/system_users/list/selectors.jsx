// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getUser, getProfiles, getProfilesInTeam, getProfilesWithoutTeam, searchProfiles, searchProfilesInTeam} from 'xenia-redux/selectors/entities/users';

import {getFilterOptions} from 'utils/get_users';

const ALL_USERS = '';
const NO_TEAM = 'no_team';
const USER_ID_LENGTH = 26;

export function getUsers(state, loading, teamId, term, filter) {
    if (loading) {
        // Show no users while loading.
        return [];
    }
    const filters = getFilterOptions(filter);
    if (term) {
        let users = [];
        if (teamId) {
            users = searchProfilesInTeam(state, teamId, term, false, filters);
        } else {
            users = searchProfiles(state, term, false, filters);
        }

        if (users.length === 0 && term.length === USER_ID_LENGTH) {
            const user = getUser(state, term);
            if (user) {
                users = [user];
            }
        }

        return users;
    }

    if (teamId === ALL_USERS) {
        return getProfiles(state, filters);
    } else if (teamId === NO_TEAM) {
        return getProfilesWithoutTeam(state, filters);
    }

    return getProfilesInTeam(state, teamId, filters);
}

export function getNonBotUsers(state, loading, teamId, term, filter) {
    return getUsers(state, loading, teamId, term, filter).filter((user) => {
        return !user.is_bot;
    });
}
