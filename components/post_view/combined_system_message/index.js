// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getMissingProfilesByIds, getMissingProfilesByUsernames} from 'xenia-redux/actions/users';
import {Preferences} from 'xenia-redux/constants';
import {getBool} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentUser, makeGetProfilesByIdsAndUsernames} from 'xenia-redux/selectors/entities/users';

import CombinedSystemMessage from './combined_system_message.jsx';

function makeMapStateToProps() {
    const getProfilesByIdsAndUsernames = makeGetProfilesByIdsAndUsernames();

    return (state, ownProps) => {
        const currentUser = getCurrentUser(state);
        const {allUserIds, allUsernames} = ownProps;

        return {
            currentUserId: currentUser.id,
            currentUsername: currentUser.username,
            showJoinLeave: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, Preferences.ADVANCED_FILTER_JOIN_LEAVE, true),
            userProfiles: getProfilesByIdsAndUsernames(state, {allUserIds, allUsernames}),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getMissingProfilesByIds,
            getMissingProfilesByUsernames,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(CombinedSystemMessage);
